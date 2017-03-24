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

class Router {
  constructor() {
    this._interval = null
    this._oldLocation = null
    this._routes = new Map()

    this._listen = this._listen.bind(this)
    this._handleRouteChange = this._handleRouteChange.bind(this)
    this.add = this.add.bind(this)
    this.run = this.run.bind(this)
  }

  get _location() {
    return window.location
  }

  _handleRouteChange(loc) {
    const route = this._routes.get(loc.pathname)
    if (route) {
      route(loc)
    } else {
      this._routes.get('*')()
    }
  }

  add(pathname, callback) {
    this._routes.set(pathname, callback.bind(null, this))
    return this
  }

  run() {
    this._listen(this._handleRouteChange)
  }

  navigate(path, state = {}) {
    return history.pushState(state, null, path)
  }

  navigateBack() {
    return history.back()
  }

  _listen(onChange) {
    clearInterval(this._interval)

    this._interval = setInterval(() => {
      if (this._oldLocation === null) {
        this._oldLocation = Object.assign({}, this._location)
        this._handleRouteChange(this._location)
      } else if (this._oldLocation.href === this._location.href) {
        // console.log('same location')
      } else {
        // console.log('change')
        this._oldLocation = Object.assign({}, this._location)
        onChange(this._location)
      }
    }, 50)
  }

  unlisten() {
    return clearInterval(this._interval)
  }
}

function p(elementType, props = {}, childrens = null) {
  const element = document.createElement(elementType)
  const keys =  Object.keys(props)

  if (keys.length) {
    keys.forEach(key => {
      if (key === 'ref') {
        props.ref(element)
      } else if (key === 'style') {
        Object.keys(props.style).forEach(
          style => element.style[style] = props.style[style]
        )
      } else {
        element[key] = props[key]
      }
    })
  }

  if (childrens) {
    if (Array.isArray(childrens)) {
      childrens.forEach(item => element.appendChild(item))
    } else {
      element.appendChild(childrens)
    }
  }

  return element
}

function renderView(html) {
  const root = document.getElementById('app')
  while (root.firstChild) {
    root.removeChild(root.firstChild)
  }

  root.appendChild(html)
}

function renderRoot(router) {
  const view =
    p('div', {id: 'header'}, [
      p('div', {textContent: 'Привіт, TernopilJS!'}),
      p('div', {textContent: ' Базовий приклад SPA без використання сторонніх бібліотек.'}),
      p('a', {href: '#', textContent: 'Перейти на привітання', onclick(evt) {evt.preventDefault(); router.navigate('/hello')}}),
      p('a', {href: '#', textContent: 'Перейти назад', onclick(evt) {evt.preventDefault(); router.navigateBack()}})
    ])

  return renderView(view)
}

function renderHello(router) {
  const view =
    p('div', {id: 'hello'}, [
      p('div', {textContent: 'Helloooooooo!'}),
      p('a', {href: '#', textContent: 'Перейти на головну', onclick(evt) {evt.preventDefault(); router.navigate('/')}}),
      p('a', {href: '#', textContent: 'Перейти назад', onclick(evt) {evt.preventDefault(); router.navigateBack()}})
    ])

  return renderView(view)
}

function renderNotFound(router) {
  const view =
    p('div', {id: 'hello'}, [
      p('div', {textContent: '404! Not Found!'}),
      p('a', {href: '#', textContent: 'Перейти на головну', onclick(evt) {evt.preventDefault(); router.navigate('/')}}),
      p('a', {href: '#', textContent: 'Перейти назад', onclick(evt) {evt.preventDefault(); router.navigateBack()}})
    ])

  return renderView(view)
}

const app = new App()
