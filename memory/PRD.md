# Y-Store Marketplace - PRD

## Дата: 2026-03-03
## Статус: Развёрнуто и работает

---

## Оригинальная задача
Клонировать репозиторий Y-Store с GitHub (https://github.com/svetlanaslinko057/rtyui765432), поднять фронтенд, бэкенд и MongoDB. Изучить аудит админки и подготовиться к рефакторингу.

---

## Архитектура

### Tech Stack
- **Frontend**: React 19, TailwindCSS, Radix UI, React Router 7
- **Backend**: FastAPI, Python 3.11, Motor (async MongoDB)
- **Database**: MongoDB (test_database)
- **Auth**: JWT tokens

### Интеграции (ключи настроены)
- Telegram Bot: 239151803:AAFBBufl...
- Нова Пошта: 5cb1e3ebc23e75d737fd57c1e056ecc9
- WayForPay: merchant + secret key

---

## Что реализовано

### 1. Развёртывание приложения ✅
- Клонирован репозиторий с GitHub
- Настроены переменные окружения (.env)
- Установлены зависимости (pip, yarn)
- Запущены frontend и backend через supervisor

### 2. База данных MongoDB ✅
- 8 категорий товаров
- 40 товаров
- Коллекции: products, categories, orders, users, etc.

### 3. Авторизация ✅
- JWT токены работают
- Admin user создан: admin@ystore.ua / admin123
- Роль admin в коллекции users

### 4. Админ-панель ✅
- AdminPanelRefactored.js - рефакторенная версия (7 модулей)
- Модули: Дашборд, Каталог, Замовлення, CRM, Маркетинг, Фінанси, Налаштування
- Lazy loading компонентов

---

## Учётные данные

| Роль | Email | Пароль |
|------|-------|--------|
| Admin | admin@ystore.ua | admin123 |

---

## URLs

- Frontend: https://monogp-dev-deploy.preview.emergentagent.com
- Backend API: https://monogp-dev-deploy.preview.emergentagent.com/api
- Admin Panel: https://monogp-dev-deploy.preview.emergentagent.com/admin

---

## Аудит админки (из AUDIT_REPORT.md)

### Критические проблемы из предыдущего аудита
1. ✅ Дубли моделей в server.py - lint проходит без ошибок
2. ❓ "Хвосты" кода вне классов - требует проверки
3. ✅ Старые версии админки удалены (AdminPanel.js, AdminPanelV2.js)
4. ❓ Папка /admin2/ - требует проверки

### План исправлений по аудиту
- [ ] Этап 1: Backend cleanup - удалить дубли, хвосты кода
- [ ] Этап 2: Frontend cleanup - проверить неиспользуемые компоненты
- [ ] Этап 3: Code review - полный lint и тестирование

---

## Backlog

### P0 - Done
- [x] Клонировать и развернуть приложение
- [x] Настроить MongoDB
- [x] Создать admin пользователя
- [x] Проверить работу админ-панели

### P1 - Pending (Рефакторинг по аудиту)
- [ ] Удалить дубли моделей в server.py
- [ ] Удалить хвосты кода
- [ ] Проверить и удалить /components/admin2/
- [ ] Удалить неиспользуемые компоненты

### P2 - Future
- [ ] Email-уведомления
- [ ] Bulk редактирование
- [ ] Оптимизация производительности

---

## API Ключи (настроены в .env)

```
TELEGRAM_BOT_TOKEN=239151803:AAFBBufl...
NOVA_POSHTA_API_KEY=5cb1e3ebc...
WAYFORPAY_SECRET_KEY=4f27e43c7052...
WAYFORPAY_MERCHANT_ACCOUNT=a6fcf5fe2a...
JWT_SECRET_KEY=supersecret_jwt_key_y_store_2026
```
