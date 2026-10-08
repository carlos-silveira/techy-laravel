<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Http;

$accessToken = config('services.facebook.page_access_token');

if (!$accessToken) {
    echo "Missing Facebook credentials.\n";
    exit(1);
}

// 1. Get Page ID from /me
echo "Fetching Page ID...\n";
$meResponse = Http::get("https://graph.facebook.com/v19.0/me", [
    'access_token' => $accessToken,
]);

if (!$meResponse->successful()) {
    echo "Failed to fetch Page ID: " . $meResponse->body() . "\n";
    exit(1);
}
$pageId = $meResponse->json('id');
echo "Page ID: $pageId\n";

// 2. Fetch posts
echo "Fetching Facebook posts...\n";
$response = Http::get("https://graph.facebook.com/v19.0/{$pageId}/posts", [
    'access_token' => $accessToken,
    'fields' => 'id,message,created_time',
    'limit' => 100,
]);

if (!$response->successful()) {
    echo "Failed to fetch posts: " . $response->body() . "\n";
    exit(1);
}

$data = $response->json();
$posts = $data['data'] ?? [];

echo "Found " . count($posts) . " posts.\n";

$seenMessages = [];
$deletedCount = 0;

foreach ($posts as $post) {
    $id = $post['id'];
    $message = $post['message'] ?? 'NO_MESSAGE_' . $id; 
    
    if (isset($seenMessages[$message]) && $message !== 'NO_MESSAGE_' . $id) {
        echo "Duplicate found (ID: $id) - Message: " . substr(str_replace("\n", " ", $message), 0, 50) . "...\n";
        echo "  -> Deleting...\n";
        
        $deleteResponse = Http::delete("https://graph.facebook.com/v19.0/{$id}", [
            'access_token' => $accessToken,
        ]);
        
        if ($deleteResponse->successful()) {
            echo "  -> Deleted successfully.\n";
            $deletedCount++;
        } else {
            echo "  -> Failed to delete: " . $deleteResponse->body() . "\n";
        }
    } else {
        $seenMessages[$message] = true;
    }
}

echo "Done. Deleted $deletedCount duplicate posts.\n";
