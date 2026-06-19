# TechyNews Workspace Rules

The following rules apply to all AI agents working within this repository. Agents MUST strictly adhere to these guidelines to maintain stability and UI consistency.

## Mandatory Pre-Deployment Testing
- **Rule**: Before committing and pushing any feature or fix, the agent MUST run the relevant test suite to verify functionality.
- **Backend changes**: Run `php artisan test` (or `phpunit`).
- **Frontend changes**: Run component/unit tests (e.g., `npm run test` or Cypress if configured) and `npm run build` to verify there are no compilation errors.
- **Enforcement**: NEVER release or push unusable, broken, or untested code.

## Mobile Responsive UI & Markdown Tables
- **Rule**: When building UI components that render Markdown, or when designing for mobile, extra care must be taken to prevent layout overflows.
- **Implementation**: Always wrap `<ReactMarkdown>` tables in `overflow-x-auto` to prevent flex containers from breaking on mobile viewports. Ensure all chat or floating UI elements use `calc(100vw - ...)` or safe max-widths so they don't cause horizontal scrolling on mobile.

## iOS PWA Icons
- **Rule**: When generating or modifying PWA icons (`apple-touch-icon.png`), never use transparent backgrounds.
- **Reasoning**: Apple iOS does not support transparency in home screen icons and will fill it with solid black. Always ensure a solid background color matching the app's theme.

## Dependency Management & PHP Versioning
- **Rule**: When updating or installing Composer packages, ensure `config.platform.php` in `composer.json` strictly matches the actual server runtime (PHP 8.3).
- **Enforcement**: This prevents Composer from pulling package versions that rely on unsupported newer syntax (like PHP 8.4 property hooks) which will crash the application during `package:discover`.
