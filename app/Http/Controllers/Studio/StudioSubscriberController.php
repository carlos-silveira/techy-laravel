<?php

declare(strict_types=1);

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StudioSubscriberController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $query = Subscriber::query();

        if ($search) {
            $query->where('email', 'like', "%{$search}%");
        }

        $subscribers = $query->latest()->paginate(20)->withQueryString();

        $totalCount = Subscriber::count();
        $newThisWeek = Subscriber::where('created_at', '>=', now()->subDays(7))->count();
        $prevWeek = Subscriber::where('created_at', '>=', now()->subDays(14))
            ->where('created_at', '<', now()->subDays(7))
            ->count();

        $growthRate = $prevWeek > 0
            ? round((($newThisWeek - $prevWeek) / $prevWeek) * 100, 1)
            : ($newThisWeek > 0 ? 100 : 0);

        return Inertia::render('Studio/Subscribers/Index', [
            'subscribers' => $subscribers,
            'filters' => [
                'search' => $search,
            ],
            'stats' => [
                'total' => $totalCount,
                'new_this_week' => $newThisWeek,
                'growth_rate' => $growthRate,
            ],
        ]);
    }

    public function destroy($id)
    {
        $sub = Subscriber::findOrFail($id);
        $sub->delete();

        return back()->with('success', 'Subscriber removed.');
    }

    public function export()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="subscribers-' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Email', 'Status', 'Subscribed Date']);

            Subscriber::chunk(500, function ($subscribers) use ($file) {
                foreach ($subscribers as $sub) {
                    fputcsv($file, [
                        $sub->id,
                        $sub->email,
                        $sub->is_active ? 'Active' : 'Unsubscribed',
                        $sub->created_at->toDateTimeString(),
                    ]);
                }
            });

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
