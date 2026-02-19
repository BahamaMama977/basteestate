#!/bin/bash

# ===========================================
# Скрипт деплоя БАСТ Недвижимость
# ===========================================
#
# ПЕРЕД ИСПОЛЬЗОВАНИЕМ:
# 1. Замените переменные ниже на ваши данные
# 2. Убедитесь, что SSH ключ добавлен на сервер
# 3. Запустите: chmod +x deploy.sh && ./deploy.sh
#

# ===== НАСТРОЙКИ (ЗАМЕНИТЕ НА СВОИ) =====
SERVER_USER="root"                          # Пользователь SSH
SERVER_IP="YOUR_SERVER_IP"                  # IP вашего VPS
SERVER_PATH="/var/www/bast-estate"          # Путь на сервере
SUBDOMAIN="landing.yourdomain.ru"           # Ваш поддомен
# =========================================

set -e  # Остановка при ошибке

echo "🏗️  Сборка проекта..."
npm run build

echo "📦 Проверка папки out/..."
if [ ! -d "out" ]; then
    echo "❌ Ошибка: папка out/ не создана. Проверьте next.config.js"
    exit 1
fi

echo "🚀 Загрузка на сервер..."
rsync -avz --delete \
    out/ \
    ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

echo "✅ Деплой завершён!"
echo ""
echo "📍 Сайт доступен по адресу: http://${SUBDOMAIN}"
echo ""
echo "⚠️  Не забудьте:"
echo "   1. Настроить DNS (A-запись ${SUBDOMAIN} → ${SERVER_IP})"
echo "   2. Скопировать nginx.conf на сервер"
echo "   3. Установить SSL: sudo certbot --nginx -d ${SUBDOMAIN}"
