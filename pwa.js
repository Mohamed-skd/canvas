importScripts("dist/scripts/SW.js")

const pwa= new PWA("canvas-cache", [
"index.html",
"detail.html",
"detail.html?id=n1",
"detail.html?id=n2",
"detail.html?id=n3",
"detail.html?id=n4",
"detail.html?id=n5",
"detail.html?id=n6",
"detail.html?id=n7",
"detail.html?id=n8",
"detail.html?id=n9",
"detail.html?id=n10",
"dist/Canvas.js",
"dist/script.js",
"dist/detail.js",
"dist/style.css",
])

addEventListener("install", pwa.setCache.bind(pwa))
addEventListener("activate", pwa.cleanCache.bind(pwa))
addEventListener("fetch", pwa.getCache.bind(pwa))

