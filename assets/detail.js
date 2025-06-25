// App
const canvas= document.querySelector("canvas")
const params= new URL(location.href).searchParams
const id= params.get("id")
if (!id) location.assign("index.html")
if (!id.match("^n[0-9]+$")) location.assign("index.html")

const module= await import("./Canvas.js")
if (id in module) {
  module[id](canvas)
}

if ("serviceWorker" in navigator){
  await navigator.serviceWorker.register("pwa.js")
}

