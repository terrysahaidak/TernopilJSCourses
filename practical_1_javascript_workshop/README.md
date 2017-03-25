# Death poets' community

> Спільнота мертвих поетів — демо-проект, який показує розробку односторінкового веб-застосунку (Singe Page Application, SPA) з використанням архітектурного шаблону Модель-Вид-Контролер (Model-View-Controller, MVC) на Vanilla JS.

## Стадії розробки

### 1. Модель

Реалізуємо допоміжний об'єкт для роботи із localStorage.

```js
const store = {
  get(){},
  set(){}
}
```

Потрібно реалізувати клас `Model`, який буде неймспейсом для моделей. Крім того за допомогою цього класу буде оголошуватись нова модель із необхідною структурою.

```js
class Model {}

const model = new Model()

model.defineModel({
  name: 'author',
  fields: {
    id: {type: String},
    fullName: {type: String, defaultTo: '', presence: true},
    avatarUrl: {type: String, defaultTo: 'http://placehold.it/100x300'},
    dateOfDeath: {type: String, defaultTo: ''},
    city: {type: String, defaultTo: ''},
    books: {ref: 'book'}
  }
})

model.defineModel({
  name: 'book',
  fields: {
    id: {type: String},
    title: {type: String, defaultTo: ''},
    image: {type: String, defaultTo: 'http://placehold.it/100x300'},
    genre: {type: String, defaultTo: ''},
    year: {type: String, defaultTo: ''},
    authors: {ref: 'author'}
  }
})
```

Наступна дія — реалізувати клас `Collection`, який і буде нашою моделлю. В класу повинні бути реалізовані методи `inster`, `remove`, `find`, `findAll`, для роботи із даними.

```js
class Collection {}
```

Саме посилання не екземпляр класу повинно бути доступне через `namespace.modelName`.

```js
model.author.insert({
  id: '1',
  fullName: 'Death Man',
  avatarUrl: '',
  dateOfDeath: '',
  city: '',
  books: ['1']
})

model.book.insert({
  id: '1',
  title: 'Book of Death Man',
  image: '',
  genre: 'Novel',
  year: '2000',
  authors: ['1']
})
```

При `insert` повинна відбуватись валідація даних.
