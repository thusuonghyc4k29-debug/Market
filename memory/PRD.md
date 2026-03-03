# Y-Store Marketplace - PRD

## Дата: 2026-03-03
## Статус: ✅ Полностью развёрнуто и работает

---

## Все интеграции работают

| Интеграция | Статус | Детали |
|------------|--------|--------|
| Telegram Bot | ✅ | @YStore_a_bot - polling запущен |
| Нова Пошта | ✅ | Поиск городов и отделений работает |
| WayForPay | ✅ | Checkout URL генерируется |
| MongoDB | ✅ | 8 категорий, 40 товаров |
| JWT Auth | ✅ | admin@ystore.ua / admin123 |

---

## Ключи API (настроены в .env)

```
TELEGRAM_BOT_TOKEN=8239151803:AAFBBufl...
NOVAPOSHTA_API_KEY=5cb1e3ebc23e75d737fd57c1e056ecc9
WAYFORPAY_MERCHANT_ACCOUNT=a6fcf5fe2a413bdd25bb8b2e7100663a
WAYFORPAY_MERCHANT_SECRET=4f27e43c7052...
```

---

## URLs

- **Сайт**: https://monogp-dev-deploy.preview.emergentagent.com
- **Админка**: https://monogp-dev-deploy.preview.emergentagent.com/admin
- **Telegram**: @YStore_a_bot

---

## Учётные данные

| Роль | Email | Пароль |
|------|-------|--------|
| Admin | admin@ystore.ua | admin123 |

---

## Запуск бота

```bash
cd /app/backend && ./start_bot.sh
# или
cd /app/backend && python -m modules.bot.bot_app
```

Логи: `tail -f /var/log/telegram_bot.log`

---

## Аудит админки (pending)

Из AUDIT_REPORT.md - план исправлений:
- [ ] Проверить дубли моделей в server.py
- [ ] Удалить неиспользуемые компоненты
- [ ] Полный code review

---

## Tech Stack

- **Frontend**: React 19, TailwindCSS, Radix UI
- **Backend**: FastAPI, Python 3.11, Motor
- **Database**: MongoDB
- **Bot**: aiogram 3.x
