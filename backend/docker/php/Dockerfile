FROM php:8.4-fpm-alpine

WORKDIR /var/www/app

RUN apk add --no-cache \
    $PHPIZE_DEPS \
    libzip-dev \
    libpng-dev \
    jpeg-dev \
    freetype-dev \
    libwebp-dev \
    libxml2-dev \
    libpq-dev \
    oniguruma-dev \
    icu-dev \
    curl \
    unzip \
    openssl \
    libgomp

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

RUN install-php-extensions \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    bcmath \
    calendar \
    exif \
    gd \
    intl \
    mbstring \
    opcache \
    pcntl \
    redis \
    soap \
    zip \
    imagick \
    xdebug

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# RUN apk del .build-deps # Baris ini sering error jika tidak ada paket .build-deps, opsional

COPY docker/php/docker.conf /usr/local/etc/php-fpm.d/docker.conf

COPY docker/php/php.ini /usr/local/etc/php/conf.d/99-custom.ini

COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 9000
CMD ["php-fpm"]
