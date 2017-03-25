class Router {
  constructor() {
    this._interval = null
    this._oldLocation = null
    this._routes = []

    this._listen = this._listen.bind(this)
    this._handleRouteChange = this._handleRouteChange.bind(this)
    this.add = this.add.bind(this)
    this.run = this.run.bind(this)
  }

  get _location() {
    return window.location
  }

  _handleRouteChange(loc) {
    const findRoute = pathname => {
      return this._routes.find(route => {
        return typeof route.pathname === 'string'
          ? pathname === route.pathname
          : !!pathname.match(route.pathname)
      })
    }

    const route = findRoute(loc.pathname)

    if (route) {
      route.callback(loc)
    } else {
      findRoute('*').callback()
    }
  }

  add(pathname, callback) {
    this._routes.push({pathname, callback: callback.bind(null, this)})
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
  const keys =  Object.keys(props === null ? {} : props)

  if (keys.length) {
    keys.forEach(key => {
      switch (key) {
      case 'ref':
        props.ref(element)
        break
      case 'style':
        typeof props[key] === 'string'
          ? element[key] = props[key]
          : Object.keys(props[key]).forEach(style => element.style[style] = props.style[style])
        break
      default:
        element[key] = props[key]
      }
    })
  }

  const append = item => typeof item === 'string'
    ? element.appendChild(document.createTextNode(item))
    : element.appendChild(item)

  if (childrens) {
    [].concat(childrens)
      .forEach(item => append(item))
  }

  return element
}

const router = new Router()

class App {
  constructor() {
    this._init()
  }

  _init() {
    document.addEventListener("DOMContentLoaded", () => router.run())
  }
}


router
  .add('/', appController.index)
  // .add('/books', booksController.index)
  // .add(/(\/books\/)(\d+)/, renderHello)
  // .add('/authors', authorsController.index)
  // .add('/(\/authors\/)(\d+)/', authorsController.show)
  // .add('*', renderNotFound)

const app = new App()
