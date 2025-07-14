#!/bin/bash

# Laravel server with Xdebug configuration

echo "🔧 Starting Laravel server with Xdebug..."

# Kill any existing Laravel processes
pkill -f "php artisan serve" 2>/dev/null

# Start Laravel server with Xdebug
php -dxdebug.mode=debug \
   -dxdebug.start_with_request=yes \
   -dxdebug.client_host=127.0.0.1 \
   -dxdebug.client_port=9003 \
   -dxdebug.log=/tmp/xdebug.log \
   artisan serve 