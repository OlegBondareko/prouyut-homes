# ПроУют — Продажа домов (CMS-lite)

Статический сайт на GitHub Pages. Объявления живут в `data/listings.json`, фото — в `images/`.

## Публикация
1. Создайте публичный репозиторий, например `prouyut-homes`.
2. Загрузите **всё содержимое архива в корень** репозитория.
3. Включите Pages: Settings → Pages → Source: *Deploy from a branch*, Branch: `main` / `(root)` → Save.
4. Сайт откроется: `https://<ваш_логин>.github.io/prouyut-homes/`

## Добавление объекта
1. Загрузите свои фото в папку `images/`.
2. Откройте `data/listings.json` → **Edit** → добавьте объект в массив. Пример:

```json
{
  "id": "new-house-id",
  "title": "Дом с террасой и садом",
  "price_rub": 5900000,
  "location": "Кропоткин",
  "area_m2": 128,
  "bedrooms": 3,
  "bathrooms": 2,
  "lot_m2": 400,
  "cover": "images/myhouse-cover.jpg",
  "photos": ["images/myhouse-1.jpg", "images/myhouse-2.jpg", "images/myhouse-3.jpg"],
  "features": ["Патио", "Костровая зона", "Панорамные окна"],
  "description": "Светлый тёплый дом, идеален для семьи и друзей.",
  "links": {
    "telegram": "https://t.me/ВАШ_НИК",
    "whatsapp": "https://wa.me/79990000000",
    "vk": "https://vk.com/ВАШ_ПРОФИЛЬ",
    "youtube": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
  },
  "published": true,
  "date": "2025-08-28"
}
```

## Видео и ссылки
- `links.youtube` или `links.video` (YouTube) — появится встроенный плеер.
- Кнопки Telegram/WhatsApp/VK берутся из `links`.

## Фильтры
- Поиск по названию/локации
- Цена от/до
- Спальни 2+/3+/4+

Готово. Редактируйте JSON — и сайт обновится без программиста.
