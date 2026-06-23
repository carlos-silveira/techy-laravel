<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class AgentController extends Controller
{
    /**
     * Trigger the YOLO agent manually in the background.
     */
    public function runAgent(Request $request): JsonResponse
    {
        $mode = $request->input('mode', 'autonomous'); // 'scout' or 'autonomous'
        $limit = (int) $request->input('limit', 10);
        
        $command = "php " . base_path('artisan') . " yolo:agent --limit={$limit}";
        if ($mode === 'scout') {
            $command .= " --scout";
        }
        
        $logPath = storage_path('logs/agent.log');
        
        // Clear previous log
        file_put_contents($logPath, '');
        
        // Run detached background process
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            pclose(popen("start /B " . $command . " > " . escapeshellarg($logPath) . " 2>&1", "r"));
        } else {
            exec($command . " > " . escapeshellarg($logPath) . " 2>&1 &");
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Agent started in the background.',
            'mode' => $mode
        ]);
    }

    /**
     * Fetch the live logs and status of the agent.
     */
    public function getStatus(): JsonResponse
    {
        $logPath = storage_path('logs/agent.log');
        $logs = file_exists($logPath) ? file_get_contents($logPath) : 'No logs available.';
        
        $lastRun = Cache::get('yolo_agent_last_run');
        
        return response()->json([
            'logs' => $logs,
            'last_run' => $lastRun
        ]);
    }
}
