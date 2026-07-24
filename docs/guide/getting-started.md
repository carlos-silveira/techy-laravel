# Getting Started

Follow these instructions to set up the TechyNews project locally for development.

## Prerequisites

- **PHP 8.3+**
- **Composer**
- **Node.js 22+ & npm**
- **MySQL 8.0+**
- **MLX-LM** (Optional, for local high-performance LLM on Apple Silicon)

## Local Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:carlos-silveira/techy-laravel.git
   cd techy-laravel
   ```

2. **Install PHP Dependencies:**
   ```bash
   composer install
   ```

3. **Install Node.js Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Copy the example `.env` file and set your local database credentials and API keys:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Make sure to configure your `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` and `GEMINI_API_KEY`.*

5. **Database Migration:**
   ```bash
   php artisan migrate --seed
   ```

## Running the Application

TechyNews uses Laravel for the backend and Vite for the frontend. You need to run both concurrently.

**Terminal 1 (Laravel Backend):**
```bash
php artisan serve
```

**Terminal 2 (Vite Frontend):**
```bash
npm run dev
```

Visit `http://localhost:8000` to see the application running.
