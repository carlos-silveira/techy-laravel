# AI-Assisted Development Guide (M4 Optimized)

This document provides a comprehensive guide to developing this project using a combination of local and cloud-based Large Language Models (LLMs), specifically optimized for the Apple M4 chip using MLX.

## 1. Local LLM Setup (MLX Native - HIGH PERFORMANCE)

For maximum speed (up to 25+ tokens/sec) on a MacBook M4, we use **MLX-LM** instead of Ollama. This leverages the M4's Unified Memory and Neural Engine directly.

### 1.1. Installation

1.  **Install MLX-LM**:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install mlx-lm
    ```

### 1.2. Running the Local Server

Launch the MLX server with the Qwen2.5-Coder model:
```bash
source .venv/bin/activate
python -m mlx_lm.server --model mlx-community/Qwen2.5-Coder-32B-4bit --port 8080
```
*Note: This server is OpenAI-compatible and serves as the backend for both the Laravel app and VS Code extensions.*

### 1.3. VS Code Integration (Cline / Roo Code)

Para usar Cline (o Roo Code) con tu servidor local de alto rendimiento:

1.  **Abre Cline** en VS Code.
2.  Haz clic en el icono de **Ajustes** (engranaje).
3.  Selecciona **API Provider**: `OpenAI Compatible`.
4.  Configura los siguientes campos:
    -   **Base URL**: `http://localhost:8080/v1`
    -   **API Key**: `none` (o cualquier texto, el servidor MLX no la requiere).
    -   **Model ID**: `mlx-community/Qwen2.5-Coder-32B-4bit`
5.  Haz clic en **Done**.

### 1.4. VS Code Integration (Continue Extension)

To get "Cursor-like" speed and intelligence:

1.  **Install the "Continue" extension** in VS Code.
2.  **Edit `config.json`** in Continue:
    ```json
    {
      "models": [
        {
          "title": "Qwen 2.5 Coder 32B (MLX)",
          "provider": "openai",
          "model": "mlx-community/Qwen2.5-Coder-32B-4bit",
          "apiBase": "http://localhost:8080/v1"
        }
      ],
      "tabAutocompleteModel": {
        "title": "Qwen 2.5 Coder 7B (MLX)",
        "provider": "openai",
        "model": "mlx-community/Qwen2.5-Coder-7B-4bit-mlx",
        "apiBase": "http://localhost:8080/v1"
      }
    }
    ```
    *Tip: Use 32B for Chat/Refactoring and 7B for Tab Autocomplete (FIM) for instant response.*

### 1.4. Integrated AI Service (Laravel)

The project uses `LlamaService` (now optimized for MLX) located in `app/Services/LlamaService.php`. It connects to `http://localhost:8080/v1` and uses the `Qwen2.5-Coder-32B-4bit` model by default.

## 2. Cloud-Based LLM Development (Antigravity)

For more complex tasks or when you need the power of larger models, use Antigravity with cloud-based LLMs like Gemini or Claude.

### 2.1. Best Practices

-   **Use for Complex Logic**: Leverage cloud-based LLMs for complex tasks like generating entire features, writing complex tests, or refactoring large codebases.
-   **Provide Clear Context**: Always provide the LLM with the relevant files and a clear description of the task.
-   **Iterate and Refine**: Use the LLM as a pair programmer. Review the generated code, provide feedback, and iterate until you achieve the desired result.
-   **Monitor Quotas**: Be mindful of your API usage and quotas. Switch to a local LLM for smaller tasks to conserve your cloud resources.

## 3. Development Workflow

This project follows a test-driven development (TDD) workflow, with a focus on continuous integration and improvement.

### 3.1. Testing

-   **Backend Tests**: PHPUnit is used for backend testing. Run tests using `php artisan test`.
-   **Frontend Tests**: Jest and React Testing Library are used for frontend testing. Run tests using `npm test` or `npx jest`.
-   **End-to-End Testing**: The development process includes manual end-to-end testing to ensure all features are working as expected.

### 3.2. Feature Implementation

1.  **Plan the Feature**: Break down the feature into smaller, manageable tasks.
2.  **Write the Tests**: Write tests for the new feature before writing the implementation.
3.  **Implement the Feature**: Use the LLM to help you write the code, following the established coding style and conventions.
4.  **Run the Tests**: Ensure all tests pass after implementing the feature.
5.  **Refactor and Refine**: Review the code and refactor as needed to improve readability, performance, and maintainability.

## 4. Key Project Decisions

Based on the development journey documented in `docs/Antigravity conv.md`, here are some of the key decisions made:

-   **AI-Powered Content Generation**: The application uses an AI-powered dashboard to help generate articles, with a focus on human-in-the-loop editing.
-   **Portfolio Integration**: The "About" page is designed to serve as a personal portfolio.
-   **Dynamic Homepage**: The homepage is designed to be visually impressive and engaging, inspired by award-winning portfolio websites.
-   **SEO and Analytics**: The application includes features for SEO and analytics to track article performance.
-   **Dark Mode**: The application includes a dark mode theme for improved user experience.

## 5. Future Improvements

-   **Automated End-to-End Testing**: Implement a framework like Cypress or Playwright for automated end-to-end testing.
-   **CI/CD Pipeline**: Set up a CI/CD pipeline to automate the testing and deployment process.
-   **Advanced AI Features**: Explore more advanced AI features, such as personalized content recommendations and automated content curation.
-   **Performance Optimization**: Continuously monitor and optimize the application's performance.
