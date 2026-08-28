<?php
$content = file_get_contents('config/services.php');

$linkedinConfig = <<<CONFIG
    'linkedin' => [
        'access_token' => env('LINKEDIN_ACCESS_TOKEN'),
        'author_urn' => env('LINKEDIN_AUTHOR_URN'),
    ],
CONFIG;

$content = preg_replace('/(];\s*)$/', $linkedinConfig . "\n$1", $content);
file_put_contents('config/services.php', $content);
echo "Patched successfully\n";
