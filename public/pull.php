<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Checking environment...\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "User: " . get_current_user() . "\n";
echo "Base Path: " . dirname(__DIR__) . "\n";
echo "Unzip check: " . shell_exec('which unzip') . "\n";
echo "Memory Limit: " . ini_get('memory_limit') . "\n";
echo "Post Max Size: " . ini_get('post_max_size') . "\n";
echo "Upload Max Filesize: " . ini_get('upload_max_filesize') . "\n";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "\nPOST detected.\n";
    if (isset($_FILES['deployFile'])) {
        echo "File detected: " . $_FILES['deployFile']['name'] . " (" . $_FILES['deployFile']['size'] . " bytes)\n";
    } else {
        echo "No deployFile in FILES. Keys: " . implode(', ', array_keys($_FILES)) . "\n";
    }
}
