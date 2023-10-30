class Cache {
  constructor(type) {
    this.storage = type === 'Local' ? localStorage : sessionStorage
  }

  setCache(key, value) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}


const localCache = new Cache('Local')
const sessionCache = new Cache('Session')

export { localCache, sessionCache }
