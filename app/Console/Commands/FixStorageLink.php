<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class FixStorageLink extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'storage:fix';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recreates the storage symbolic link and sets proper permissions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting storage link fix...');

        $publicStoragePath = public_path('storage');

        if (File::exists($publicStoragePath)) {
            $this->warn('Removing existing public/storage...');
            if (is_link($publicStoragePath)) {
                unlink($publicStoragePath);
            } else {
                File::deleteDirectory($publicStoragePath);
            }
        }

        $this->info('Creating new storage link...');
        $this->call('storage:link');

        $this->info('Setting permissions...');
        $storageAppPublic = storage_path('app/public');
        
        if (File::exists($storageAppPublic)) {
            // Ensure the directory is writable
            @chmod($storageAppPublic, 0775);
            $this->info('Permissions updated for ' . $storageAppPublic);
        }

        $this->info('Storage link fix complete.');
        return 0;
    }
}
