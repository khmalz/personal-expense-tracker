#!/bin/sh
set -e

# Set permissions for Laravel directories
chown -R www-data:www-data \
    /var/www/app/storage \
    /var/www/app/bootstrap/cache \
    /var/www/app/database

# Atur izin agar grup (www-data) bisa menulis
chmod -R 777 \
    /var/www/app/storage \
    /var/www/app/bootstrap/cache \
    /var/www/app/database

exec "$@"
