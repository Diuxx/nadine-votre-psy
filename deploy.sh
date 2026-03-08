#!/bin/bash

set -e  # stoppe le script à la moindre erreur

# VARIABLES
PROJECT_DIR="$(pwd)"
BUILD_DIR="_site"
WWW_DIR="/var/www/nicoblog"
NGINX_CONF_SRC="$PROJECT_DIR/nginx/nicoblog.conf"
NGINX_CONF_DST="/etc/nginx/sites-available/nicoblog"
NGINX_ENABLED="/etc/nginx/sites-enabled/nicoblog"

# SSL Variables
DOMAIN="nicoblog.dev"
EMAIL="nicolasmarmot@gmail.com"

echo "🚀 Starting deployment..."

# 2️⃣ Build Eleventy
echo "🔧 Building Eleventy..."
npx @11ty/eleventy

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory not found"
  exit 1
fi

# 3️⃣ Copier le site généré
echo "📂 Copying site to /var/www..."
sudo rm -rf "$WWW_DIR"
sudo mkdir -p "$WWW_DIR"
sudo cp -r "$BUILD_DIR"/* "$WWW_DIR"

# 4️⃣ Permissions (important)
sudo chown -R www-data:www-data "$WWW_DIR"
sudo chmod -R 755 "$WWW_DIR"

# 5️⃣ Copier la config Nginx
echo "🧩 Installing Nginx config..."
sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"

# 6️⃣ Activer le site si pas déjà fait
if [ ! -L "$NGINX_ENABLED" ]; then
  sudo ln -s "$NGINX_CONF_DST" "$NGINX_ENABLED"
fi

# 7️⃣ Tester la config Nginx
echo "🔍 Testing Nginx configuration..."
sudo nginx -t

# 8️⃣ Reload Nginx
echo "♻️ Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment complete!"

if [ ! -f "/etc/letsencrypt/renewal/$DOMAIN.conf" ]; then
  echo "🔐 No SSL certificate found, generating one..."

  sudo certbot --nginx \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --redirect
else
  echo "🔒 SSL certificate already exists"
fi
