<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\BotDetector;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ReclassifyBots extends Command
{
    protected $signature = 'analytics:reclassify-bots';

    protected $description = 'Re-evaluate page_views.is_bot for all rows using the shared BotDetector rules';

    public function handle(BotDetector $detector): int
    {
        // Classify per distinct UA (a handful of thousand at most) instead of per row.
        $botUas = [];
        $humanUas = 0;

        DB::table('page_views')
            ->select('user_agent')
            ->distinct()
            ->orderBy('user_agent')
            ->chunk(500, function ($rows) use ($detector, &$botUas, &$humanUas) {
                foreach ($rows as $row) {
                    $detector->isBot($row->user_agent) ? $botUas[] = $row->user_agent : $humanUas++;
                }
            });

        DB::table('page_views')->update(['is_bot' => false]);

        foreach (array_chunk(array_map(fn ($ua) => (string) $ua, $botUas), 200) as $chunk) {
            DB::table('page_views')
                ->where(fn ($q) => $q->whereIn('user_agent', $chunk)
                    ->when(in_array('', $chunk, true), fn ($q) => $q->orWhereNull('user_agent')))
                ->update(['is_bot' => true]);
        }

        // NULL user agents are never in the distinct list as ''. Handle explicitly.
        DB::table('page_views')->whereNull('user_agent')->update(['is_bot' => true]);

        $bots = DB::table('page_views')->where('is_bot', true)->count();
        $total = DB::table('page_views')->count();

        $this->info(sprintf('Reclassified %d rows: %d bot hits, %d human hits.', $total, $bots, $total - $bots));

        return self::SUCCESS;
    }
}
