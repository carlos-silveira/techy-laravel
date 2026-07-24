# Social Media & Llama Services

## `SocialMediaService.php`
TechyNews includes architecture to auto-publish synthesized articles to social channels (Twitter/X, LinkedIn, Bluesky).
- Uses the `Article` model to generate brief, platform-specific hooks.
- Leverages Gemini to summarize the article into a 280-character tweet or a professional LinkedIn post, appending appropriate hashtags.

## `LlamaService.php`
While `GeminiService` handles cloud-based inference, `LlamaService` is built for local development and edge deployments.
- **Integration:** Connects to a local MLX-LM server (`http://localhost:8080/v1`) running the `Qwen2.5-Coder` or `Llama-3` models.
- **Cost Saving:** By switching the `.env` default AI provider to `LlamaService`, developers can test the entire pipeline locally without incurring OpenRouter or Google API costs.
- **Payload:** Strictly OpenAI-compatible payload format.
