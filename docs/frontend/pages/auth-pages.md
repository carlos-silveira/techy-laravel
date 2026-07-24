# Authentication Pages

These React components provide the visual interface for Laravel's authentication system. They are located in `resources/js/Pages/` (often within an `Auth/` subdirectory).

## The Components
- `Login.jsx`: The sign-in form.
- `Register.jsx`: The sign-up form.
- `ForgotPassword.jsx`: Form to request a password reset link.
- `ResetPassword.jsx`: Form to enter a new password.
- `VerifyEmail.jsx`: Screen shown when an account requires email confirmation before proceeding.
- `ConfirmPassword.jsx`: Security screen for sensitive actions.

## Context for AI Agents
These are standard Inertia forms using the `useForm` hook. They automatically handle CSRF tokens and validation errors provided by the Laravel backend.
