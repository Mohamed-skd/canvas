import {
  n1,
  n2,
  n3,
  n4,
  n5,
  n6,
  n7
} from "./Canvas.js"

// UTILS
// pwa
if ("serviceWorker" in navigator){
  await navigator.serviceWorker.register("pwa.js")
}

// APP
// canvas 1
const c1= document.querySelector("#c1")
n1(c1)

// canvas 2
const c2= document.querySelector("#c2")
n2(c2)

// canvas 3
const c3= document.querySelector("#c3")
n3(c3)

// canvas 4
const c4= document.querySelector("#c4")
n4(c4)

//canvas 5
const c5= document.querySelector("#c5")
n5(c5)

// canvas 6
const c6= document.querySelector("#c6")
n6(c6)

// canvas 7
const c7= document.querySelector("#c7")
n7(c7)

