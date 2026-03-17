# Development Setup

This document explains how to run the Laravel project with Xdebug and frontend development.

## Quick Start

### Option 1: Use the development script (Recommended)
```bash
./start-dev.sh
```

### Option 2: Manual setup

#### 1. Start Laravel with Xdebug
```bash
./start-laravel-xdebug.sh
```

#### 2. Start Frontend Watch (in another terminal)
```bash
npm run watch
```

## Xdebug Configuration

The Laravel server is configured with the following Xdebug settings:
- **Mode**: debug
- **Client Host**: 127.0.0.1
- **Client Port**: 9003
- **Log File**: /tmp/xdebug.log

## VS Code Debugging

1. Open VS Code
2. Go to Run and Debug (Ctrl+Shift+D)
3. Select "Listen for Xdebug"
4. Set breakpoints in your PHP code
5. Access http://localhost:8000 to trigger debugging

## Local LLM Setup (Ollama)

To use local AI models (like with Cline or Roo Code), you can set up Ollama on your MacBook M4.

### 1. Install & Start Ollama
1. Download Ollama from [ollama.com](https://ollama.com).
2. Install the app and launch it.
3. Pull a powerful coding model for your M4:
   ```bash
   ollama pull qwen2.5-coder:7b
   ```

### 2. Configure Cline / Roo Code in VS Code
1. Open the **Cline** or **Roo Code** extension in VS Code.
2. Open **Settings** (Gear icon).
3. Select **Provider**: `Ollama`.
4. Set **Base URL**: `http://localhost:11434`.
5. Set **Model ID**: `qwen2.5-coder:7b` (recommended for M4).
6. Enable **Context Window**: 32k or higher (M4 handles this easily).

### 3. Integrated Llama Service
The project includes a `LlamaService` that connects to your local Ollama instance.
- **Model used**: `qwen2.5-coder:7b`
- **Endpoint**: `http://localhost:11434/api`

## Available Scripts

- `./start-dev.sh` - Start both Laravel and npm watch
- `./start-laravel-xdebug.sh` - Start only Laravel with Xdebug
- `npm run watch` - Watch for frontend changes
- `npm run dev` - Build frontend assets once

## Ports

- **Laravel**: http://localhost:8000
- **Xdebug**: 9003
- **MySQL**: 3306

## Troubleshooting

### Xdebug not connecting?
1. Check if Xdebug is installed: `php -m | grep xdebug`
2. Verify port 9003 is not blocked
3. Check Xdebug log: `tail -f /tmp/xdebug.log`

### Frontend not updating?
1. Check if npm watch is running
2. Clear browser cache
3. Restart npm watch: `npm run watch`

### Laravel server issues?
1. Clear cache: `php artisan cache:clear`
2. Restart server: `./start-laravel-xdebug.sh`
3. Check logs: `tail -f storage/logs/laravel.log` 