# GeminiService

`app/Services/GeminiService.php` is the most critical component in the TechyNews repository. It orchestrates all calls to Google Gemini 2.0 (and fallback OpenRouter models) for content synthesis.

## Core Responsibilities

### 1. `generateIdeas(array $scoutedArticles)`
Takes a list of raw RSS data and prompts Gemini to act as an editorial director. It returns a JSON structure containing 3-5 unique, high-value editorial angles that combine multiple sources into a coherent narrative.

### 2. `generateDraft(array $idea)`
The heaviest operation. It uses **Blueprint Prompting** to instruct Gemini to write a 1500-2000 word technical deep-dive. 
- Demands the output in valid, raw HTML (`<h1>`, `<h2>`, `<p>`, `<ul>`, `<blockquote>`).
- Enforces tone guidelines (senior developer, objective, no fluff).
- Injects the `current_date` to prevent temporal hallucinations.

### 3. `translate(Article $article, string $locale)`
Handles on-demand translation of the `title`, `summary`, and `content`.
- Implements **Recursive Unwrapping** to ensure if Gemini mistakenly wraps the HTML in a JSON object, the service unwraps it until valid HTML is exposed.
- Caches the result in the `translations` column of the `Article` model.

## API Integration & Fallbacks

- **OpenRouter Integration:** Due to rate limits, `GeminiService` routes traffic through OpenRouter.
- **Fallback Chain:** If Gemini 2.0 fails or hits a 429, OpenRouter automatically cascades to secondary models (limited to 3 fallbacks to respect free-tier constraints).
- **Timeouts:** API calls have aggressive timeout bounds to prevent PHP worker exhaustion during API degraded states.
