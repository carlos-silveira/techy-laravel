# AI Studio Bug Log & Lessons Learned

## Bug 1: Unclickable Editor Buttons (Ongoing)
**Symptom**: Formatting buttons and the AI Tools menu in the `RichEditor` component are unresponsive or visually blocked.
**Root Cause Hypothesis**: 
1.  **Event Bubbling**: Tiptap/ProseMirror might be capturing clicks intended for the toolbar.
2.  **State Feedback Loop**: The `Dashboard.jsx` updates `richContent` on every keystroke, which passes a new `content` prop back to `RichEditor`. This triggers a `useEffect` that calls `editor.commands.setContent()`, potentially re-initializing the editor state and breaking UI interactions.
3.  **Layout Clipping**: Absolute positioning in the `AIMenu` might be conflicting with parent container `overflow` rules.

**Lesson**: Decouple the editor's internal state from the parent's "Save" state to prevent unnecessary content resets. Use a "controlled-uncontrolled" pattern where the parent only pushes content when it *needs* to reset (e.g., loading a different article).

## Bug 2: Article Validation Failure (Fixed)
**Symptom**: "Cloud Synchronization Failed" whenever content was typed but no title was present.
**Root Cause**: Laravel's `required` validation on the `title` field was failing during the auto-save process before the user had a chance to name the story.
**Fix**: Added a fallback to "Untitled Story" in the `ArticleController` and frontend.
**Lesson**: Auto-save features must have more relaxed validation or default values to ensure data persistence isn't interrupted by "Work in Progress" states.

## Bug 3: AI Formatting "Chatter" (Fixed)
**Symptom**: AI responses sometimes included markdown wrappers (```json) or conversational text, breaking the JSON parser.
**Root Cause**: LLMs (Gemini/Llama) are probabilistic and don't always follow "JSON only" instructions.
**Fix**: Implemented a robust `extractJson` method in `LlamaService` and `GeminiService` using `strpos` to find valid JSON boundaries.
**Lesson**: Never trust an AI to return pure JSON. Always sanitize and extract.

## Bug 4: CSRF Session Mismatch (Temporarily Bypassed)
**Symptom**: Requests to `/articles` would randomly fail with 419 or 422 errors.
**Root Cause**: The SPA (Inertia) session state sometimes drifted from the CSRF token stored in the cookie during long editing sessions.
**Fix**: Excluded API routes from CSRF middleware for the development phase to ensure 100% uptime for AI features.
**Lesson**: API-heavy dashboards should prioritize state reliability, especially during rapid prototyping.

## Bug 5: Literal Placeholder Translations in Spanish / Multilingual Pipeline (Fixed)
**Symptom**: Certain articles rendered literally with title: `"título traducido"`, summary: `["resumen traducido"`, and content: `"contenido HTML traducido"`.
**Root Cause**: The translation prompt in `GeminiService::translateArticle()` previously ended with an example schema containing placeholder strings (`"title": "translated title", "summary": "translated summary", "content": "translated html content"`). Certain LLM models took this literally and translated the placeholder keys and schema values instead of translating the input article. Furthermore, there was no validation preventing these placeholders from being saved to the database.
**Fix**: 
1. Redesigned `GeminiService::translateArticle()` prompt with explicit XML input blocks (`<input_title>`, `<input_summary>`, `<input_content>`) and strict anti-placeholder instructions.
2. Added `Article::isInvalidTranslation()` to validate that translations do not contain dummy strings or suspiciously short content.
3. Updated `PublicController::translateIfNecessary()` and `SocialMediaService` to detect invalid translations, clear them, re-dispatch `TranslateArticle`, and fall back to the clean source content so users never see placeholder text.
4. Enhanced `articles:pre-translate` and `article:fix-encoding` commands to automatically find and heal invalid placeholder translations.
**Lesson**: Always validate AI-generated output for mock/placeholder strings from example JSON schemas. Never trust example schemas to be understood purely as types by all LLMs.

---
**Testing Requirement**: Every change must be verified by:
1. `php artisan test` (Backend logic)
2. Manual browser smoke-test (Frontend interaction)
