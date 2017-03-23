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
