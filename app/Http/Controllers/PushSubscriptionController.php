<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PushSubscriber;

class PushSubscriptionController extends Controller
{
    /**
     * Store a new push subscription.
     */
    public function store(Request $request)
    {
        $request->validate([
            'endpoint'    => 'required|string',
            'keys.auth'   => 'required|string',
            'keys.p256dh' => 'required|string',
        ]);

        $guestId = $request->cookie('techynews_guest_id') ?? $request->ip();

        // Find or create the push subscriber (anonymous model)
        $subscriber = PushSubscriber::firstOrCreate(['guest_id' => $guestId]);

        // Update the push subscription using the trait's method
        $subscriber->updatePushSubscription(
            $request->endpoint,
            $request->keys['p256dh'],
            $request->keys['auth']
        );

        return response()->json(['success' => true]);
    }

    /**
     * Remove a push subscription.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'endpoint' => 'required|string',
        ]);

        $guestId = $request->cookie('techynews_guest_id') ?? $request->ip();
        $subscriber = PushSubscriber::where('guest_id', $guestId)->first();

        if ($subscriber) {
            $subscriber->deletePushSubscription($request->endpoint);
        }

        return response()->json(['success' => true]);
    }
}
