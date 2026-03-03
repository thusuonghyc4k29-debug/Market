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
