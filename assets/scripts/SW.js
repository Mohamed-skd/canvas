class Worker {}

class PWA {
  constructor(cacheName= "app-cache", cacheFiles= []){
    this.cacheName= cacheName
    this.cacheFiles= cacheFiles
  }

  setCache(e){
    e.waitUntil(this.#setCacheFn())
  }
  getCache(e){
    e.respondWith(this.#getCacheFn(e))
  }
  cleanCache(e){
    e.waitUntil(this.#cleanCacheFn())
  }

  async #setCacheFn(){
    const cache= await caches.open(this.cacheName)
    return cache.addAll(this.cacheFiles)
  }
  async #getCacheFn(e){
    let res= await caches.match(e.request)
    if (res) return res

    res= await fetch(e.request)
    const cache= await caches.open(this.cacheName)
    cache.put(e.request, res.clone())
    return res
  }
  async #cleanCacheFn(){
    const cachesKeys= await caches.keys()
    return Promise.all(cachesKeys.map(key=>{
      if (key!==this.cacheName) return caches.delete(key)
      return true
    }))
  }
}

