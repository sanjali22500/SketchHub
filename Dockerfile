# Use an official PHP image as the base image
FROM php:8.1-cli

# Install curl (needed to download Composer)
RUN apt-get update && apt-get install -y curl

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# Set the working directory in the container
WORKDIR /app

# Copy all files from the current directory to the container
COPY . .

# Install PHP dependencies using Composer
RUN composer install

# Expose port 10000 (or any other port you want to use)
EXPOSE 10000

# Start the PHP server (adjust the public directory as needed)
CMD ["php", "-S", "0.0.0.0:10000", "-t", "public/"]
