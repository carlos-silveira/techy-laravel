# Push Notifications

TechyNews uses Web Push Notifications to alert anonymous visitors when new articles are published. 

## Architecture

- **Package:** `laravel-notification-channels/webpush` (wraps `minishlink/web-push`)
- **Database:** `push_subscribers` table (Model: `App\Models\PushSubscriber`) and `push_subscriptions` table (from the package).
- **Service Worker:** `public/sw.js` handles receiving the push event and displaying the notification.
- **Frontend:** `resources/js/Components/PushSubscribe.jsx` handles asking for permission and sending the subscription to the backend.

## How it works
1. When a user clicks the subscribe button, the browser requests notification permission.
2. If granted, the frontend registers the Service Worker (`sw.js`) and requests a push subscription from the browser using the `VITE_VAPID_PUBLIC_KEY`.
3. The frontend sends the subscription details (endpoint, keys) to `POST /push/subscribe`.
4. The backend uses the `PushSubscriptionController` to save the subscription. Since our users are mostly anonymous, we link it to a `PushSubscriber` model which uses a `guest_id` (IP or cookie-based).
5. When a new article is generated via `news:generate-daily`, the `App\Notifications\NewArticlePublished` notification is dispatched to all `PushSubscriber` models.
6. The service worker receives the push event and displays it. Clicking the notification opens the article.

## VAPID Keys
Web push requires VAPID keys. These are set in the `.env` file:
```env
VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
VITE_VAPID_PUBLIC_KEY="${VAPID_PUBLIC_KEY}"
```
To generate new keys, run:
```bash
php artisan webpush:vapid
```
