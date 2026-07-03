<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Article;
use Illuminate\Support\Facades\Cache;

class EeatUpgradeController extends Controller
{
    /**
     * Get the current status and statistics of legacy articles.
     */
    public function status(): JsonResponse
    {
        // Count published articles that are upgraded
        $totalUpgraded = Article::where('is_quality_upgraded', true)
                                ->where('is_published', true)
                                ->count();
        
        // Count published articles that are pending upgrade
        $totalPending = Article::where('is_quality_upgraded', false)
                                ->where('is_published', true)
                                ->count();
                                
        $totalArticles = Article::where('is_published', true)->count();
        
        return response()->json([
            'upgraded' => $totalUpgraded,
            'pending' => $totalPending,
            'total' => $totalArticles,
            'percentage' => $totalArticles > 0 ? round(($totalUpgraded / $totalArticles) * 100, 1) : 0
        ]);
    }

    /**
     * Trigger the E-E-A-T legacy upgrade command manually in the background.
     */
    public function trigger(Request $request): JsonResponse
    {
        $limit = (int) $request->input('limit', 1);
        
        $command = "php " . base_path('artisan') . " news:upgrade-legacy --limit={$limit}";
        
        $logPath = storage_path('logs/eeat_upgrade.log');
        
        // Clear previous log
        file_put_contents($logPath, "🚀 Starting E-E-A-T Upgrade Process (Limit: {$limit})...\n");
        
        // Run detached background process
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            pclose(popen("start /B " . $command . " >> " . escapeshellarg($logPath) . " 2>&1", "r"));
        } else {
            exec($command . " >> " . escapeshellarg($logPath) . " 2>&1 &");
        }
        
        return response()->json([
            'success' => true,
            'message' => "Upgrade started in the background (Limit: {$limit})."
        ]);
    }

    /**
     * Fetch the live logs of the upgrade process.
     */
    public function logs(): JsonResponse
    {
        $logPath = storage_path('logs/eeat_upgrade.log');
        $logs = file_exists($logPath) ? file_get_contents($logPath) : 'No logs available. Ready to run.';
        
        return response()->json([
            'logs' => $logs
        ]);
    }
}
