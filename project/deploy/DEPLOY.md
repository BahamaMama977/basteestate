# Инструкция по деплою БАСТ Недвижимость

## Шаг 1: Подготовка DNS

В панели управления доменом создайте A-запись:
```
Тип: A
Имя: landing (или ваш поддомен)
Значение: IP_ВАШЕГО_VPS
TTL: 3600
```

## Шаг 2: Подготовка сервера (выполнить на VPS)

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Nginx
sudo apt install nginx -y

# Создание директории для сайта
sudo mkdir -p /var/www/bast-estate
sudo chown -R $USER:$USER /var/www/bast-estate

# Установка Certbot для SSL
sudo apt install certbot python3-certbot-nginx -y
```

## Шаг 3: Настройка Nginx (на VPS)

```bash
# Скопируйте nginx.conf на сервер и отредактируйте поддомен
sudo nano /etc/nginx/sites-available/bast-estate

# Вставьте содержимое nginx.conf, замените YOUR_SUBDOMAIN.YOUR_DOMAIN.ru

# Активируйте конфиг
sudo ln -s /etc/nginx/sites-available/bast-estate /etc/nginx/sites-enabled/

# Проверка конфига
sudo nginx -t

# Перезапуск Nginx
sudo systemctl reload nginx
```

## Шаг 4: Сборка и деплой (на локальной машине)

```bash
cd /Users/romanmensikov/basteestate/project

# Сборка
npm run build

# Загрузка на сервер (замените данные)
rsync -avz --delete out/ root@YOUR_SERVER_IP:/var/www/bast-estate/
```

Или используйте скрипт `deploy.sh` (отредактируйте переменные):
```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

## Шаг 5: Установка SSL (на VPS)

```bash
sudo certbot --nginx -d YOUR_SUBDOMAIN.YOUR_DOMAIN.ru
```

Certbot автоматически:
- Получит сертификат
- Настроит HTTPS в Nginx
- Добавит автопродление

## Шаг 6: Проверка

Откройте в браузере:
- http://YOUR_SUBDOMAIN.YOUR_DOMAIN.ru
- https://YOUR_SUBDOMAIN.YOUR_DOMAIN.ru (после SSL)

---

## Быстрые команды для повторного деплоя

```bash
# Локально: сборка + загрузка
npm run build && rsync -avz --delete out/ root@YOUR_IP:/var/www/bast-estate/
```

## Troubleshooting

**502 Bad Gateway:**
- Проверьте путь в nginx.conf
- `sudo nginx -t` для проверки синтаксиса

**Сайт не открывается:**
- Проверьте DNS: `dig YOUR_SUBDOMAIN.YOUR_DOMAIN.ru`
- Проверьте firewall: `sudo ufw allow 80` и `sudo ufw allow 443`

**SSL не работает:**
- Проверьте, что DNS уже обновился (может занять до 24ч)
- `sudo certbot renew --dry-run` для проверки автопродления
