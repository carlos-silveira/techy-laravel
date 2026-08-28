<?php
$content = file_get_contents('app/Services/SocialMediaService.php');

$linkedinMethod = <<<METHOD

    /**
     * Post to LinkedIn using API v2.
     */
    public function postToLinkedIn(\App\Models\Article \$article)
    {
        \$accessToken = config('services.linkedin.access_token');
        \$authorUrn = config('services.linkedin.author_urn');

        if (!\$accessToken || !\$authorUrn) {
            \Illuminate\Support\Facades\Log::warning('LinkedIn post skipped. API Keys missing in config.');
            return false;
        }

        try {
            \$translations = is_string(\$article->translations) ? json_decode(\$article->translations, true) : \$article->translations;
            \$titleEs = \$translations['es']['title'] ?? \$article->title;
            \$summaryEs = \$translations['es']['summary'] ?? \$article->ai_summary;

            if (!\$summaryEs) {
                return false;
            }

            \$postText = \$titleEs . "\n\n" . \$summaryEs;
            
            \$baseUrl = rtrim(config('app.url', 'https://techynews.lat'), '/');
            if (!str_starts_with(\$baseUrl, 'https://')) {
                \$baseUrl = str_replace('http://', 'https://', \$baseUrl);
            }
            \$link = \$baseUrl . '/article/' . \$article->slug;

            \$payload = [
                "author" => \$authorUrn,
                "lifecycleState" => "PUBLISHED",
                "specificContent" => [
                    "com.linkedin.ugc.ShareContent" => [
                        "shareCommentary" => [
                            "text" => \$postText
                        ],
                        "shareMediaCategory" => "ARTICLE",
                        "media" => [
                            [
                                "status" => "READY",
                                "originalUrl" => \$link,
                                "title" => [
                                    "text" => \$titleEs
                                ]
                            ]
                        ]
                    ]
                ],
                "visibility" => [
                    "com.linkedin.ugc.MemberNetworkVisibility" => "PUBLIC"
                ]
            ];

            \$response = \Illuminate\Support\Facades\Http::withHeaders([
                'Authorization' => 'Bearer ' . \$accessToken,
                'X-Restli-Protocol-Version' => '2.0.0',
            ])->post("https://api.linkedin.com/v2/ugcPosts", \$payload);

            if (\$response->successful()) {
                \Illuminate\Support\Facades\Log::info("Successfully posted to LinkedIn: {\$article->slug}");
                return true;
            } else {
                \Illuminate\Support\Facades\Log::error("Failed to post to LinkedIn: " . \$response->body());
                return false;
            }
        } catch (\Exception \$e) {
            \Illuminate\Support\Facades\Log::error("LinkedIn Integration Exception: " . \$e->getMessage());
            return false;
        }
    }
}
METHOD;

$content = preg_replace('/}\s*$/', $linkedinMethod, $content);
file_put_contents('app/Services/SocialMediaService.php', $content);
echo "Patched successfully\n";
