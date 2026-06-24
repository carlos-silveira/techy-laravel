<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\User;
use App\Models\ScoutQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ObservabilityController extends Controller
{
    /**
     * Get system observability stats and logs.
     */
    public function index(Request $request)
    {
        // 1. Gather Database Statistics
        $dbStats = [
            'articles_total' => Article::count(),
            'articles_published' => Article::where('status', 'published')->count(),
            'articles_drafts' => Article::where('status', '!=', 'published')->count(),
            
            'scout_total' => ScoutQueue::count(),
            'scout_pending' => ScoutQueue::where('status', 'pending')->count(),
            'scout_generating' => ScoutQueue::where('status', 'generating')->count(),
            'scout_completed' => ScoutQueue::where('status', 'completed')->count(),
            'scout_failed' => ScoutQueue::where('status', 'failed')->count(),
            
            'users_total' => User::count(),
        ];

        // 2. Tail the laravel.log file
        $logs = [];
        $logPath = storage_path('logs/laravel.log');
        
        if (File::exists($logPath)) {
            // Read last 300 lines using shell tail for performance
            $output = [];
            exec('tail -n 300 ' . escapeshellarg($logPath), $output);
            
            foreach (array_reverse($output) as $line) {
                if (trim($line) === '') continue;
                
                $parsed = [
                    'timestamp' => '',
                    'level' => 'INFO',
                    'message' => $line,
                    'raw' => $line
                ];

                if (preg_match('/^\[(.*?)\] (.*?)\.(ERROR|WARNING|INFO|DEBUG): (.*)/', $line, $matches)) {
                    $parsed['timestamp'] = $matches[1];
                    $parsed['level'] = $matches[3];
                    $parsed['message'] = $matches[4];
                }

                $logs[] = $parsed;
            }
        }

        return response()->json([
            'stats' => $dbStats,
            'logs' => $logs
        ]);
    }
}
