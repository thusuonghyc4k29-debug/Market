# Y-Store Marketplace

## Полная техническая спецификация

---

# 🎯 ИДЕЯ ПРОЕКТА

**Y-Store** — это полнофункциональный интернет-магазин электроники для украинского рынка с интегрированной системой управления заказами, CRM и автоматизацией бизнес-процессов.

### Ключевые особенности:
- **Омниканальность**: Web-витрина + Telegram-бот для администраторов
- **Украинская локализация**: Нова Пошта для доставки, WayForPay для оплаты
- **Автоматизация**: Система алертов, отслеживания статусов, CRM-автоматика
- **Модульная архитектура**: 40+ независимых модулей на бэкенде

### Целевая аудитория:
- Покупатели электроники (B2C)
- Администраторы магазина (через Telegram-бота и веб-админку)

---

# 🏗️ АРХИТЕКТУРА

## Общая схема

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  React 19 + TailwindCSS + Radix UI + React Router 7         │
│  289 компонентов                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS / REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
│  FastAPI + Python 3.11 + Motor (async MongoDB driver)        │
│  252 Python-файла | 134+ API endpoints                       │
│  40+ модулей в /modules/                                     │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│    MongoDB       │ │  Telegram Bot    │ │  External APIs   │
│  25 коллекций    │ │  aiogram 3.x     │ │  - Нова Пошта    │
│                  │ │                  │ │  - WayForPay     │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

---

# 💻 ТЕХНОЛОГИЧЕСКИЙ СТЕК

## Frontend
| Технология | Версия | Назначение |
|------------|--------|------------|
| React | 19 | UI Framework |
| TailwindCSS | 3.x | Стилизация |
| Radix UI | latest | Accessible компоненты |
| React Router | 7 | Роутинг |
| Lucide React | latest | Иконки |
| Axios | latest | HTTP-клиент |

## Backend
| Технология | Версия | Назначение |
|------------|--------|------------|
| FastAPI | latest | Web Framework |
| Python | 3.11 | Язык программирования |
| Motor | latest | Async MongoDB driver |
| Pydantic | 2.x | Валидация данных |
| python-jose | latest | JWT токены |
| passlib | latest | Хеширование паролей |
| aiogram | 3.x | Telegram Bot Framework |

## База данных
| Технология | Назначение |
|------------|------------|
| MongoDB | Основная БД |

---

# 📁 СТРУКТУРА ПРОЕКТА

```
/app/
├── backend/                    # FastAPI Backend
│   ├── server.py              # Главный файл (4276 строк)
│   ├── modules/               # 40+ модулей
│   │   ├── auth/             # Аутентификация
│   │   ├── bot/              # Telegram бот
│   │   ├── orders/           # Заказы
│   │   ├── payments/         # Платежи (WayForPay, Fondy)
│   │   ├── delivery/         # Доставка (Нова Пошта)
│   │   ├── catalog/          # Каталог товаров
│   │   ├── crm/              # CRM система
│   │   ├── analytics/        # Аналитика
│   │   ├── automation/       # Автоматизация
│   │   ├── guard/            # Безопасность
│   │   ├── risk/             # Управление рисками
│   │   ├── reviews/          # Отзывы
│   │   ├── returns/          # Возвраты
│   │   ├── notifications/    # Уведомления
│   │   └── ...               # И другие
│   ├── novaposhta_service.py # Интеграция Нова Пошта
│   ├── core/                 # Ядро (config, db, models)
│   └── requirements.txt      # Python зависимости
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── pages/            # Страницы (30+)
│   │   ├── components/       # Компоненты (200+)
│   │   │   ├── admin/       # Админ-панель (28 компонентов)
│   │   │   ├── ui/          # UI компоненты (shadcn/ui)
│   │   │   ├── checkout/    # Оформление заказа
│   │   │   └── ...
│   │   ├── contexts/         # React Contexts (8 шт)
│   │   ├── hooks/            # Custom Hooks
│   │   ├── i18n/             # Переводы (UA)
│   │   └── utils/            # Утилиты
│   └── package.json
│
└── memory/
    └── PRD.md                # Документация проекта
```

---

# 🗄️ БАЗА ДАННЫХ (MongoDB)

## Коллекции (25 шт.)

### Основные
| Коллекция | Назначение |
|-----------|------------|
| `users` | Пользователи системы |
| `customers` | CRM-данные клиентов |
| `products` | Товары каталога |
| `categories` | Категории товаров |
| `orders` | Заказы |
| `carts` | Корзины пользователей |

### Финансы и платежи
| Коллекция | Назначение |
|-----------|------------|
| `finance_ledger` | Финансовые транзакции |
| `payment_events` | События платежей |
| `idempotency_keys` | Идемпотентность платежей |

### Доставка
| Коллекция | Назначение |
|-----------|------------|
| `shipment_events` | События доставки |

### Аналитика и события
| Коллекция | Назначение |
|-----------|------------|
| `analytics_events` | Аналитические события |
| `domain_events` | Доменные события |
| `timeline_events` | Временная шкала |
| `events` | Общие события |

### Telegram Bot
| Коллекция | Назначение |
|-----------|------------|
| `bot_settings` | Настройки бота |
| `bot_sessions` | Сессии пользователей бота |
| `bot_audit_log` | Аудит действий в боте |

### Безопасность
| Коллекция | Назначение |
|-----------|------------|
| `guard_incidents` | Инциденты безопасности |
| `guard_events` | События безопасности |

### Уведомления
| Коллекция | Назначение |
|-----------|------------|
| `notifications` | Уведомления |
| `notification_queue` | Очередь уведомлений |
| `admin_alerts_queue` | Очередь алертов для админов |

### Автоматизация
| Коллекция | Назначение |
|-----------|------------|
| `automation_events` | События автоматизации |
| `pickup_dedupe` | Дедупликация самовывоза |

### Настройки
| Коллекция | Назначение |
|-----------|------------|
| `site_settings` | Настройки сайта |

---

# 🔐 АУТЕНТИФИКАЦИЯ

## JWT-токены

```python
# Конфигурация
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_MINUTES = 10080  # 7 дней
```

## Роли пользователей
| Роль | Права |
|------|-------|
| `customer` | Покупки, личный кабинет |
| `seller` | + Управление своими товарами |
| `admin` | Полный доступ к админ-панели |

## API Endpoints
```
POST /api/auth/register - Регистрация
POST /api/auth/login    - Вход
GET  /api/auth/me       - Текущий пользователь
```

---

# 💳 ПЛАТЕЖНАЯ СИСТЕМА (WayForPay)

## Обзор
**WayForPay** — украинский платежный провайдер для приема онлайн-платежей.

## Получение ключей
1. Зарегистрироваться на https://wayforpay.com
2. Пройти верификацию мерчанта
3. В личном кабинете получить:
   - `merchantAccount` — ID мерчанта
   - `merchantSecretKey` — Секретный ключ для подписи

## Переменные окружения
```bash
WAYFORPAY_MERCHANT_ACCOUNT=your_merchant_id
WAYFORPAY_MERCHANT_SECRET=your_secret_key
WAYFORPAY_MERCHANT_DOMAIN=yourdomain.com
WAYFORPAY_RETURN_URL=https://yourdomain.com/checkout/success
WAYFORPAY_SERVICE_URL=https://yourdomain.com/api/webhooks/wayforpay
```

## Алгоритм работы

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Клиент    │         │   Backend   │         │  WayForPay  │
└─────┬───────┘         └─────┬───────┘         └─────┬───────┘
      │                       │                       │
      │  1. Оформить заказ    │                       │
      │──────────────────────>│                       │
      │                       │                       │
      │                       │  2. Создать платеж    │
      │                       │──────────────────────>│
      │                       │                       │
      │                       │  3. checkout_url      │
      │                       │<──────────────────────│
      │                       │                       │
      │  4. Redirect          │                       │
      │<──────────────────────│                       │
      │                       │                       │
      │  5. Оплата на WayForPay                       │
      │──────────────────────────────────────────────>│
      │                       │                       │
      │                       │  6. Webhook (статус)  │
      │                       │<──────────────────────│
      │                       │                       │
      │  7. Return URL        │                       │
      │<──────────────────────────────────────────────│
```

## API Endpoints
```
POST /api/v2/payments/wayforpay/create  - Создать платеж
POST /api/v2/payments/wayforpay/webhook - Webhook для статусов
GET  /api/v2/payments/wayforpay/status/{order_id} - Статус платежа
POST /api/v2/payments/wayforpay/refund  - Возврат средств
```

## Подпись запроса (HMAC_MD5)
```python
# Поля для подписи (в порядке):
signature_fields = [
    merchantAccount, merchantDomainName, orderReference,
    orderDate, amount, currency, *productNames,
    *productCounts, *productPrices
]
signature = hmac.new(
    secret_key.encode(),
    ";".join(str(f) for f in signature_fields).encode(),
    hashlib.md5
).hexdigest()
```

---

# 🚚 НОВА ПОШТА

## Обзор
**Нова Пошта** — крупнейший почтовый оператор Украины.

## Получение API ключа
1. Зарегистрироваться на https://novaposhta.ua
2. Войти в личный кабинет: https://my.novaposhta.ua
3. Перейти в Настройки → API → Создать ключ

## Переменные окружения
```bash
NOVAPOSHTA_API_KEY=your_api_key
```

## API URL
```
https://api.novaposhta.ua/v2.0/json/
```

## Алгоритм работы

### 1. Поиск города
```python
POST https://api.novaposhta.ua/v2.0/json/
{
    "apiKey": "YOUR_KEY",
    "modelName": "Address",
    "calledMethod": "searchSettlements",
    "methodProperties": {
        "CityName": "Київ",
        "Limit": 10
    }
}
```

### 2. Поиск отделения
```python
POST https://api.novaposhta.ua/v2.0/json/
{
    "apiKey": "YOUR_KEY",
    "modelName": "Address",
    "calledMethod": "getWarehouses",
    "methodProperties": {
        "CityRef": "city_ref_from_step_1",
        "WarehouseId": "1"  # Номер отделения
    }
}
```

### 3. Создание ТТН (экспресс-накладной)
```python
POST https://api.novaposhta.ua/v2.0/json/
{
    "apiKey": "YOUR_KEY",
    "modelName": "InternetDocument",
    "calledMethod": "save",
    "methodProperties": {
        "SenderWarehouseIndex": "...",
        "RecipientWarehouseIndex": "...",
        "PayerType": "Recipient",
        "PaymentMethod": "Cash",
        "CargoType": "Parcel",
        "Weight": "0.5",
        "SeatsAmount": "1",
        "Description": "Електроніка",
        "Cost": "1000",
        "ServiceType": "WarehouseWarehouse",
        ...
    }
}
```

### 4. Отслеживание посылки
```python
POST https://api.novaposhta.ua/v2.0/json/
{
    "apiKey": "YOUR_KEY",
    "modelName": "TrackingDocument",
    "calledMethod": "getStatusDocuments",
    "methodProperties": {
        "Documents": [
            {"DocumentNumber": "20450000000000"}
        ]
    }
}
```

## API Endpoints в системе
```
GET /api/novaposhta/cities?query=Київ      - Поиск городов
GET /api/novaposhta/warehouses?city_ref=X  - Отделения города
```

---

# 🤖 TELEGRAM BOT

## Обзор
Административный бот для управления магазином через Telegram.

## Получение токена
1. Написать @BotFather в Telegram
2. Команда `/newbot`
3. Указать имя и username бота
4. Получить токен вида: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

## Переменные окружения
```bash
TELEGRAM_BOT_TOKEN=your_bot_token
```

## Запуск бота
```bash
cd /app/backend
python -m modules.bot.bot_app
```

## Архитектура бота

```
┌─────────────────────────────────────────────────────────────┐
│                    BOT APPLICATION                           │
│                   (bot_app.py - 909 строк)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Handlers   │  │   Wizards    │  │   Workers    │       │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤       │
│  │ pickup_ctrl  │  │ ttn_wizard   │  │ alerts_worker│       │
│  │ returns      │  │ broadcast    │  │ automation   │       │
│  │              │  │ incidents    │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Repositories                       │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ settings_repo │ alerts_repo │ sessions_repo │ audit  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Команды бота

| Команда | Описание |
|---------|----------|
| `/start`, `/menu` | Главное меню |
| `/wizards` | Меню мастеров |
| `/debug` | Debug информация (chat_id, user_id) |
| `/help` | Справка |

## Главное меню (кнопки)

| Кнопка | Функция |
|--------|---------|
| 📦 Замовлення | Последние 5 заказов |
| 🚚 Доставки | Активные доставки (со статусом SHIPPED) |
| 👤 CRM | Поиск клиента по телефону |
| 💰 Фінанси | Баланс: доход/расход |
| ⚙️ Налаштування | Настройки порогов алертов |

## Wizards (Мастера)

### 1. TTN Wizard (Мастер ТТН)
Пошаговое создание экспресс-накладной Нова Пошта:
1. Выбор заказа
2. Ввод данных получателя
3. Ввод параметров посылки
4. Генерация ТТН

### 2. Broadcast Wizard (Рассылка)
Массовая рассылка сообщений клиентам:
1. Выбор сегмента (все, VIP, новые)
2. Ввод текста сообщения
3. Предпросмотр
4. Отправка

### 3. Incidents Wizard (Инциденты)
Обработка проблемных заказов:
- Задержки доставки (>48ч)
- Проблемы с оплатой
- Возвраты

## Handlers (Обработчики)

### Pickup Control Handler
Управление самовывозом:
- Уведомления о готовности
- Подтверждение выдачи
- QR-коды для верификации

### Returns Handler
Обработка возвратов:
- Прием заявок на возврат
- Статусы обработки
- Уведомления клиенту

## Workers (Фоновые задачи)

### Alerts Worker
Отправка уведомлений администраторам:
- Новые заказы
- Большие заказы (>10000 грн)
- Проблемы с доставкой
- Задержки

### Automation Engine
Автоматические действия:
- VIP апгрейд клиентов
- Маркировка рискованных заказов
- Алерты о задержках

## Хранение состояния
```python
# Сессии пользователей хранятся в MongoDB
# Коллекция: bot_sessions
{
    "user_id": 123456789,
    "state": "TTN:STEP_1",
    "data": {"order_id": "abc123", ...},
    "updated_at": ISODate(...)
}
```

---

# 🖥️ АДМИН-ПАНЕЛЬ

## Модули (7 групп, 22 вкладки)

### 1. Дашборд
- Розширена аналітика (AdvancedAnalytics)

### 2. Каталог
- Категорії (CategoryManagement)
- Товари (ProductManagement)
- Популярні категорії (PopularCategoriesManagement)
- Фільтри/атрибути (AttributesLibrary)

### 3. Замовлення
- Список замовлень (OrdersAnalytics)
- Повернення (ReturnsDashboard)
- Політики (PolicyDashboard)
- Виплати (PayoutsDashboard)

### 4. CRM
- Клієнти (UsersTable)
- CRM дашборд (CRMDashboard)
- Підтримка (SupportDashboard)
- Відгуки (ReviewsManagement)

### 5. Маркетинг
- Слайдер (SlidesManagement)
- Акції (PromotionsManagement)
- Секції (CustomSectionsManagement)

### 6. Фінанси (PRO)
- Платежі (PaymentHealthDashboard)
- Ризики (RiskCenter)
- Дохід (RevenueControl)
- A/B Тести (ABTests)

### 7. Налаштування
- Сайт (SiteSettingsManagement)

## Доступ к админке
```
URL: /admin
Логин: admin@ystore.ua
Пароль: admin123
```

## Lazy Loading
Все компоненты загружаются лениво для оптимизации:
```javascript
const ProductManagement = lazy(() => import('../components/admin/ProductManagement'));
```

---

# 🔌 API ENDPOINTS

## Структура

```
/api/                          # Основные endpoints
├── /auth/                     # Аутентификация
│   ├── POST /register
│   ├── POST /login
│   └── GET  /me
│
├── /products/                 # Товары
│   ├── GET  /                 # Список
│   ├── GET  /{id}            # Детали
│   ├── POST /                 # Создать (admin)
│   └── PUT  /{id}            # Обновить (admin)
│
├── /categories/               # Категории
├── /cart/                     # Корзина
├── /orders/                   # Заказы
├── /novaposhta/              # Нова Пошта
│
├── /v2/                       # API v2
│   ├── /catalog/             # Каталог v2
│   ├── /orders/              # Заказы v2
│   ├── /cabinet/             # Личный кабинет
│   ├── /payments/            # Платежи
│   │   └── /wayforpay/
│   └── /admin/               # Админ API
│
└── /v3/                       # API v3 (модульный)
    ├── /auth/
    ├── /products/
    ├── /categories/
    └── /admin/
```

---

# 🔧 КОНФИГУРАЦИЯ

## Backend (.env)
```bash
# Database
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database

# CORS
CORS_ORIGINS=*

# JWT
JWT_SECRET_KEY=your_secret_key_here

# Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABC...

# Nova Poshta
NOVAPOSHTA_API_KEY=your_np_api_key

# WayForPay
WAYFORPAY_MERCHANT_ACCOUNT=your_merchant_id
WAYFORPAY_MERCHANT_SECRET=your_secret_key
WAYFORPAY_MERCHANT_DOMAIN=yourdomain.com
WAYFORPAY_RETURN_URL=https://yourdomain.com/checkout/success
WAYFORPAY_SERVICE_URL=https://yourdomain.com/api/webhooks/wayforpay
```

## Frontend (.env)
```bash
REACT_APP_BACKEND_URL=https://yourdomain.com
WDS_SOCKET_PORT=443
```

---

# 🚀 ДЕПЛОЙ

## Supervisor
```bash
# Статус сервисов
sudo supervisorctl status

# Перезапуск
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

## Telegram Bot
```bash
# Запуск
cd /app/backend && python -m modules.bot.bot_app

# Или через скрипт
./start_bot.sh

# Логи
tail -f /var/log/telegram_bot.log
```

---

# 📊 МОНИТОРИНГ

## Health Check
```bash
GET /api/health
# Response: {"status":"ok","service":"y-store-api"}
```

## Логи
```bash
# Backend
tail -f /var/log/supervisor/backend.err.log

# Frontend
tail -f /var/log/supervisor/frontend.err.log

# Telegram Bot
tail -f /var/log/telegram_bot.log
```

---

# 🔒 БЕЗОПАСНОСТЬ

## Модули безопасности
- **Guard Module**: Мониторинг подозрительной активности
- **Risk Module**: Оценка рисков заказов
- **Rate Limiting**: Ограничение запросов

## Хеширование паролей
```python
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
```

---

# 📝 ЛИЦЕНЗИЯ

Проприетарное ПО. Все права защищены.

---

# 👥 КОНТАКТЫ

- Telegram: @YStore_a_bot
- Телефон: +380502474161, +380637247703

---

*Документация актуальна на: 2026-03-03*
