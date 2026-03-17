<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSddFromOpenApi extends Command
{
    protected $signature = 'sdd:generate {--source=api.json} {--output=SDD.md}';
    protected $description = 'Generate a Software Design Document (SDD) from OpenAPI spec.';

    public function handle()
    {
        $sourcePath = base_path($this->option('source'));
        $outputPath = base_path($this->option('output'));

        if (!File::exists($sourcePath)) {
            $this->error("Source OpenAPI file not found at: {$sourcePath}");
            $this->info("Hint: Run 'php artisan scramble:export' first.");
            return 1;
        }

        $openapi = json_decode(File::get($sourcePath), true);
        if (!$openapi) {
            $this->error("Failed to parse OpenAPI JSON.");
            return 1;
        }

        $sdd = "# Software Design Document (SDD)\n\n";
        $sdd .= "## 1. Introduction\n";
        $title = $openapi['info']['title'] ?? 'API';
        $version = $openapi['info']['version'] ?? '1.0';
        $sdd .= "This document outlines the architecture and endpoints for the **{$title}** (Version {$version}).\n\n";

        $sdd .= "## 2. Base URLs\n";
        if (!empty($openapi['servers'])) {
            foreach ($openapi['servers'] as $server) {
                $sdd .= "- `{$server['url']}`\n";
            }
        } else {
            $sdd .= "- Not specified.\n";
        }
        $sdd .= "\n";

        $sdd .= "## 3. Endpoints\n\n";
        
        if (empty($openapi['paths'])) {
            $sdd .= "_No endpoints discovered in the OpenAPI spec. Make sure your API routes are correctly registered and scanned by Scramble._\n\n";
        } else {
            foreach ($openapi['paths'] as $path => $methods) {
                foreach ($methods as $method => $details) {
                    $methodUpper = strtoupper($method);
                    $sdd .= "### `{$methodUpper} {$path}`\n";
                    
                    if (isset($details['summary'])) {
                        $sdd .= "**Summary**: {$details['summary']}\n\n";
                    }
                    if (isset($details['description'])) {
                        $sdd .= "{$details['description']}\n\n";
                    }

                    // Parameters
                    if (!empty($details['parameters'])) {
                        $sdd .= "**Parameters:**\n";
                        foreach ($details['parameters'] as $param) {
                            $required = isset($param['required']) && $param['required'] ? '(Required)' : '(Optional)';
                            $in = $param['in'] ?? 'query';
                            $type = $param['schema']['type'] ?? 'string';
                            $sdd .= "- `{$param['name']}` [{$in}, {$type}] {$required}\n";
                        }
                        $sdd .= "\n";
                    }

                    // Request Body
                    if (!empty($details['requestBody']['content']['application/json']['schema']['properties'])) {
                        $sdd .= "**Payload (application/json):**\n";
                        foreach ($details['requestBody']['content']['application/json']['schema']['properties'] as $propName => $propDetails) {
                            $type = is_array($propDetails['type'] ?? '') ? implode('|', $propDetails['type']) : ($propDetails['type'] ?? 'string');
                            $sdd .= "- `{$propName}` ({$type})\n";
                        }
                        $sdd .= "\n";
                    }

                    // Responses
                    if (!empty($details['responses'])) {
                        $sdd .= "**Responses:**\n";
                        foreach ($details['responses'] as $code => $resp) {
                            $desc = $resp['description'] ?? '';
                            $sdd .= "- **{$code}**: {$desc}\n";
                        }
                        $sdd .= "\n";
                    }
                    
                    $sdd .= "---\n\n";
                }
            }
        }

        File::put($outputPath, $sdd);
        $this->info("SDD successfully generated at: {$outputPath}");
        
        return 0;
    }
}
