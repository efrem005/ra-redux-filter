[![Redux Filter](https://github.com/efrem005/ra-redux-filter/actions/workflows/web.yml/badge.svg)](https://github.com/efrem005/ra-redux-filter/actions/workflows/web.yml)
## [GitHub Page](https://efrem005.github.io/ra-redux-filter/)

Фильтрация
===

## Задача
Расширить функциональность CRUD-приложения для управления услугами, добавив возможность фильтрации по названию услуги.

## Настройка проекта

Создайте новый проект или используйте готовое решение из задания [editing](../editing):
```bash
npm create vite@latest filter -- --template react-ts
cd filter
npm install redux react-redux nanoid
npm run dev
```

## Функциональные требования

### Обязательная функциональность

**Поиск и фильтрация:**
- [X] Поле поиска над списком услуг с плейсхолдером "Поиск услуг..."
- [X] Фильтрация по названию услуги (поиск без учета регистра)
- [X] Поиск в реальном времени (фильтрация при каждом вводе символа)
- [X] Кнопка очистки поиска (✕) справа от поля
- [X] Отображение статистики: "Найдено: X из Y услуг"

**CRUD операции с фильтром:**
- [X] Все функции редактирования работают с отфильтрованным списком
- [X] Добавление новой услуги (появляется в списке, если соответствует фильтру)
- [X] Редактирование отфильтрованной услуги
- [X] Удаление отфильтрованной услуги

**Состояния фильтра:**
- [X] Пустой фильтр → показать все услуги
- [X] Нет результатов → показать "Услуги не найдены"
- [X] Есть результаты → показать отфильтрованный список

### UI/UX требования
- [X] Поле поиска всегда видно и доступно
- [X] При очистке фильтра фокус остается на поле поиска
- [X] Подсветка найденных символов в названиях (бонус)
- [X] Debounce для оптимизации (задержка 300мс) (бонус)

## Архитектура Redux

### Расширенная структура состояния
```typescript
interface RootState {
  services: {
    items: Service[];
  };
  filter: {
    searchTerm: string;
  };
  form: {
    name: string;
    price: string;
    editingId: string | null;
    errors: {
      name?: string;
      price?: string;
    };
  };
}
```

### Дополнительные Actions
```typescript
// Управление фильтром
SET_SEARCH_TERM  // { searchTerm: string }
CLEAR_SEARCH     // void
```

### Селекторы для производных данных
```typescript
import { createSelector } from 'redux'; // npm install reselect

// Селектор для фильтрации услуг
export const selectFilteredServices = createSelector(
  [(state: RootState) => state.services.items, (state: RootState) => state.filter.searchTerm],
  (services, searchTerm) => {
    if (!searchTerm.trim()) {
      return services;
    }
    return services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);

// Селектор для статистики
export const selectFilterStats = createSelector(
  [selectFilteredServices, (state: RootState) => state.services.items],
  (filteredServices, allServices) => ({
    found: filteredServices.length,
    total: allServices.length
  })
);
```

## Анализ существующих решений

**Примеры фильтрации в популярных системах:**
- **GitHub** - поиск репозиториев с фильтрами по языку, дате
- **Gmail** - поиск по отправителю, теме, содержимому
- **Яндекс.Маркет** - фильтры по цене, производителю, характеристикам
- **Notion** - поиск по содержимому страниц

**Общие паттерны:**
- Поиск в реальном времени
- Сохранение состояния фильтра при навигации
- Очистка фильтра одним кликом
- Показ количества результатов

## Подсказки по реализации

1. **Селекторы**: используйте `createSelector` из библиотеки `reselect` для мемоизации
2. **Поиск**: `string.toLowerCase().includes()` для поиска без учета регистра
3. **Статистика**: вычисляйте через селектор, а не храните в state
4. **Debounce**: используйте `setTimeout`/`clearTimeout` или библиотеку `lodash.debounce`

## Дополнительные задачи (необязательно)
- [ ] Поиск по нескольким полям (название + описание)
- [ ] Фильтрация по диапазону цен
- [ ] Сохранение фильтра в URL (query параметры)
- [ ] Автокомплит с подсказками
- [ ] История поисковых запросов

## Структура компонентов

```
components/
├── ServiceList.tsx      // отображает отфильтрованный список
├── ServiceForm.tsx      // форма добавления/редактирования
├── SearchFilter.tsx     // поле поиска с очисткой
└── FilterStats.tsx      // статистика "Найдено X из Y"
```
