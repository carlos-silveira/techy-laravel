# Mirroring Production: Staging Environment Implementation

To prevent production regressions, we are implementing a Docker-based staging environment that mirrors the `techynews.lat` production environment (PHP 8.4/8.5 + Apache + MySQL).

## 1. Dockerfile (Staging Mirror)
We use `php:8.4-apache` to support the `.htaccess` rules used in production.

```dockerfile
FROM php:8.4-apache

# Install System Dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd zip bcmath

# Enable Apache mod_rewrite for .htaccess support
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Configure Apache DocumentRoot
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/0000-default.conf

EXPOSE 80
```

## 2. Docker Compose (Staging Stack)
This stack spins up the app and a MySQL database for integration testing.

```yaml
version: '3.8'
services:
  staging-app:
    build: .
    ports:
      - "8080:80"
    environment:
      APP_ENV: staging
      APP_DEBUG: "true"
      DB_CONNECTION: mysql
      DB_HOST: staging-db
      DB_DATABASE: techy_staging
      DB_USERNAME: staging_user
      DB_PASSWORD: staging_password
    depends_on:
      - staging-db

  staging-db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: techy_staging
      MYSQL_USER: staging_user
      MYSQL_PASSWORD: staging_password
      MYSQL_ROOT_PASSWORD: root_password
```

## 3. GitHub Actions Integration
We will insert a `test-staging` job that must pass before `web-deploy` runs.
