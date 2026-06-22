<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ScoutedArticle;
use App\Jobs\GenerateDraftJob;
use Illuminate\Support\Facades\Artisan;

class ScoutQueueController extends Controller
{
    /**
     * Retrieve the list of scouted articles.
     */
    public function index(Request $request)
    {
        $status = $request->query('status', 'pending');
        $query = ScoutedArticle::orderBy('created_at', 'desc');

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        $lastRun = \Illuminate\Support\Facades\Cache::get('yolo_agent_last_run');
        $nextRun = $lastRun ? \Carbon\Carbon::parse($lastRun)->addHours(2)->toIso8601String() : null;

        return response()->json([
            'success' => true,
            'data' => $query->get(),
            'observability' => [
                'last_run' => $lastRun,
                'next_run' => $nextRun,
            ]
        ]);
    }

    /**
     * Approve a scouted idea and queue it for generation.
     */
    public function approve($id)
    {
        $scouted = ScoutedArticle::findOrFail($id);

        if ($scouted->status !== 'pending' && $scouted->status !== 'failed') {
            return response()->json(['error' => 'Article is already generating or published.'], 400);
        }

        $scouted->update([
            'status' => 'generating',
            'error_log' => null
        ]);

        GenerateDraftJob::dispatch($scouted->id);

        return response()->json([
            'success' => true,
            'message' => 'Idea approved and queued for generation.',
            'data' => $scouted
        ]);
    }

    /**
     * Delete a scouted idea from the queue.
     */
    public function destroy($id)
    {
        $scouted = ScoutedArticle::findOrFail($id);
        $scouted->delete();

        return response()->json([
            'success' => true,
            'message' => 'Idea dismissed.',
        ]);
    }

    /**
     * Trigger the background scout agent manually (Synchronously for real-time UI feedback).
     */
    public function trigger()
    {
        // Execute synchronously and capture output
        Artisan::call('yolo:agent', ['--scout' => true]);
        
        $output = Artisan::output();

        return response()->json([
            'success' => true,
            'message' => 'Scout agent completed its scan.',
            'log' => $output
        ]);
    }
}
