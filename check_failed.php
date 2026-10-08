<?php
require __DIR__ . "/vendor/autoload.php";
$app = require_once __DIR__ . "/bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
print_r(Illuminate\Support\Facades\DB::table("failed_jobs")->orderBy("failed_at", "desc")->take(3)->get()->toArray());
