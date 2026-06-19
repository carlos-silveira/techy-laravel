<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$apiKey = $_ENV['GEMINI_API_KEY'];
$model = $_ENV['GEMINI_MODEL'] ?? 'gemini-2.5-flash';

$payload = [
    'contents' => [['parts' => [['text' => 'Hello']]]],
];

$ch = curl_init("https://generativelanguage.googleapis.com/v1beta/models/{$model}:streamGenerateContent?alt=sse&key={$apiKey}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$result = curl_exec($ch);
echo "Result:\n" . $result . "\n";
