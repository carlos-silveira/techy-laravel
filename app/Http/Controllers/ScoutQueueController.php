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

        return response()->json([
            'success' => true,
            'data' => $query->get()
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
     * Trigger the background scout agent manually.
     */
    public function trigger()
    {
        // Enqueue the artisan command to run the news scout
        Artisan::queue('yolo:agent', ['--scout' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Scout agent deployed successfully. Finding new stories now!',
        ]);
    }
}
