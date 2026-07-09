<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Gate::define('viewPulse', function (User $user) {
            $emails = array_map('trim', explode(',', env('PULSE_ADMIN_EMAILS', '')));
            return in_array($user->email, $emails) || app()->environment('local');
        });
    }
}
