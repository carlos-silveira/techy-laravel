<?php
$path = 'app/Http/Controllers/PublicController.php';
$content = file_get_contents($path);

// 1. Add comments loading to the show method
// Wait, the show method caches the article. If we add comments to the article model inside the cache, comments will be cached for 1 hour!
// Instead of caching comments, we can load them AFTER fetching from cache.
