const cacheName= "app-cache-1"

async function setCache(){
  try {
    const cache= await caches.open(cacheName)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
function install(e){
  e.waitUntil(setCache())
  console.log(`${cacheName} installed !`)
}

async function cleanCache(){
  try {
    const keys= await caches.keys()

    return Promise.all(keys.map(k=>{
      if (k!==cacheName) return caches.delete(k)
      return true
    }))
  } catch (err) {
    console.log(err)
    return false
  }
}
function cleanHist(e){
  e.waitUntil(cleanCache())
  console.log("Former cache cleaned !")
}

async function getCache(event){
  try {
    const res= await caches.match(event.request)
    if (res) return res

    const response= await fetch(event.request)
    const cache= await caches.open(cacheName)
    cache.put(event.request, response.clone())
    return response
  } catch (err) {
    console.log(err)
    return false
  }
}
function history(e){
  e.respondWith(getCache(e))
  console.log("Cache response.")
}

self.addEventListener("install", install)
self.addEventListener("activate", cleanHist)
self.addEventListener("fetch", history)

