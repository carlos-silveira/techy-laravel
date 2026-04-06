<?php
$command = "cd " . escapeshellarg(dirname(__DIR__)) . " && /usr/local/bin/php artisan social:sync-backlog > storage/logs/twitter-sync.log 2>&1 &";
exec($command);
echo "Twitter backlog sync dispatched via raw entrypoint!";
