# Домашнє завдання

## 1. Написати функцію, котра буде повертати DOM-ноду із необхідною структурою. Приклад:

```js
var view = p('div', {id: 'header'}, [
  p('div', {textContent: 'Привіт, TernopilJS!'}),
  p('div', {textContent: ' Базовий приклад SPA без використання сторонніх бібліотек.'}),
  p('a', {href: '#', textContent: 'Перейти на привітання', onclick(evt) {evt.preventDefault(); router.navigate('/hello')}}),
  p('a', {href: '#', textContent: 'Перейти назад', onclick(evt) {evt.preventDefault(); router.navigateBack()}})
])

function p(/* args */) {
  // body
}


```
Результат:
```html
<div id="header">
  <div>Привіт, TernopilJS!</div>
  <div> Базовий приклад SPA без використання сторонніх бібліотек.</div>
  <a href="#">Перейти на привітання</a>
  <a href="#">Перейти назад</a>
</div>
```

### Просунутий розв'язок

```js
var view = p('div', {id: 'header'}, [
  p('div', {style: 'font-size: 2rem;'}, 'Привіт, TernopilJS!'),
  p('br'),
  p('div', null, 'Базовий приклад SPA без використання сторонніх бібліотек.'),
  p('br'),
  p('a', {href: '#', onclick(evt) {evt.preventDefault(); router.navigate('/hello')}}, 'Перейти на привітання'),
  ' ',
  p('a', {href: '#', onclick(evt) {evt.preventDefault(); router.navigateBack()}}, [
    'Перейти ',
    p('span', {style: {color: 'black'}}, 'назад')
  ])
])
```

## 2. Написати односторінковий веб-застосунок (SPA).

#### Вимоги:
1. Наявність раутера.
2. Рендер відповідної сторінки до відповідного раута (url).
3. Робота з html history api (в крайньому випадку hash).
4. 3 сторінки: root із url `/`, hello is url `/hello` та not found, якщо url не один із попередніх.
5. Використовуйте функцію з попереднього завдання.
6. Перехід по посиланнях не має перегружати сторінку.
7. Не використовуйте додаткових бібліотек.
8. При прямому переході на певний раут рендерити його.
9. Наявність посилань між сторінками (назад, на hello, на root і т.д.)

#### Приклад:

```js
class App {
  constructor() {
    this.router = new Router()

    this.router
      .add('/', renderRoot)
      .add('/hello', renderHello)
      .add('*', renderNotFound)

    this._init()
  }

  _init() {
    document.addEventListener("DOMContentLoaded", () => this.router.run())
  }
}

class Router {}

function renderRoot() {}
function renderHello() {}
function renderNotFound() {}

const app = new App()
```

## Як використовувати boilerplate

1. Встановіть git
2. Клонуйте цей репозиторій, виконавши команду `git clone https://github.com/terrysahaidak/TernopilJSCourses.git`
3. Перейдіть у директорію lecture_4_js_and_dom
4. Встановіть nodejs.
5. У даній директорії виконайте команду `npm install`
6. Запустіть команду `npm start`
7. Перейдіть у браузері на `0.0.0.0:3000/` чи `localhost:3000/`, чи `127.0.0.1:3000/`.
