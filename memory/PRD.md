# Y-Store Marketplace - PRD

## Дата: 2026-03-03
## Статус: ✅ Полностью развёрнуто

---

## Все интеграции работают

| Интеграция | Статус |
|------------|--------|
| Telegram Bot | ✅ @YStore_a_bot |
| Нова Пошта | ✅ API работает |
| WayForPay | ✅ Платежи настроены |
| MongoDB | ✅ 8 категорий, 40 товаров |

---

## Последние изменения (2026-03-03)

### Убран выбор языка
- Удалён выбор русского языка из WelcomeModal
- Удалён dropdown языка из хедера  
- LanguageContext теперь только украинский
- Cookie banner перемещён вниз экрана (не блокирует)

---

## URLs

- **Сайт**: https://monogp-dev-deploy.preview.emergentagent.com
- **Админка**: /admin (admin@ystore.ua / admin123)
- **Бот**: @YStore_a_bot

---

## Запуск бота

```bash
cd /app/backend && python -m modules.bot.bot_app
```

---

## Обновление 2026-03-03: Подписка и Callback

### Newsletter (Подписка на рассылку)
- **Endpoint**: `POST /api/newsletter/subscribe`
- Сохраняется в коллекцию `newsletter_subscribers`
- Отправляет уведомление в Telegram админам
- UI: NewsletterBlock.jsx на главной странице

### Callback (Замовити дзвінок)
- **Endpoint**: `POST /api/contact/callback`
- Сохраняется в коллекцию `callbacks`
- Отправляет уведомление в Telegram админам
- UI: Footer.js - форма "Замовити дзвінок"

### Telegram уведомления
- Отправляются всем админам из `bot_settings.admin_chat_ids`
- Текущий admin_chat_id: 577782582
