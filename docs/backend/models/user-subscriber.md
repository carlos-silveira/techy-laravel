# User & Subscriber Models

These models handle authentication, authorization, and audience management.

## `User.php`
The standard Laravel authenticatable model. In TechyNews, a `User` typically represents an Administrator or Editor who has access to the `/dashboard`.

**Key Traits:**
- `HasApiTokens` (Sanctum/Passport)
- `Notifiable`

**Roles & Permissions:**
TechyNews keeps roles simple. Typically, any authenticated `User` in the database has admin privileges to trigger AI agents, delete articles, and view telemetry.

## `Subscriber.php`
Represents a public user who has opted into the weekly newsletter. They do not have login credentials or a password.

**Columns:**
- `email` (String, Unique)
- `is_active` (Boolean): For opt-out management.
- `locale` (String): Saves the user's preferred language (`en`, `es`, `pt`) so the newsletter can be localized on send.

**Workflow:**
- Handled by the `SendWeeklyNewsletter` console command.
- The command iterates through `Subscriber::where('is_active', true)->get()`, groups them by `locale`, and dispatches a customized Mail facade template.
