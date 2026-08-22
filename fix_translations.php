<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$slugs = [
    'google-lets-users-strip-visible-watermarks-from-ai-generated-images-m8sEtQ', 
    'openai-completes-7-billion-employee-tender-offer-hUJQMQ'
];

foreach($slugs as $slug) { 
    $a = App\Models\Article::where("slug", $slug)->first(); 
    if($a) { 
        $a->translations = []; 
        $a->save(); 
        App\Jobs\TranslateArticle::dispatch($a, "es"); 
        App\Jobs\TranslateArticle::dispatch($a, "pt"); 
        echo "Dispatched for $slug\n"; 
    } 
}
