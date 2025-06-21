import { DomFn } from "./scripts/client.js";
import { Line, Circle, Square, Triangle, Path } from "./Canvas.js"

// UTILS
const domFn = new DomFn();

// APP
// canvas 1
const c1= domFn.select("#c1")
const ctx1= c1.getContext("2d")

const line= new Line(ctx1, [100, 50], [500, 50])
line.draw()
const circle= new Circle(ctx1, [200, 300], 50)
circle.draw()
const square= new Square(ctx1, [250, 100], 100)
square.draw()
const triangle= new Triangle(ctx1, [400,300], 100)
triangle.draw(true)
const path1= new Path(ctx1, [
  [50, 110],
  [180, 150],
  [50, 300],
  [80, 380],
  [300, 380],
  [350, 260],
  [450, 120],
  [580, 350]
])
path1.draw(5)

// canvas 2
const c2= domFn.select("#c2")
const ctx2= c2.getContext("2d")
const ctr2= [c2.width/2, c2.height/2]
const pts2= []
let angle2= 0

for (let i= 0; i< 300; i++){
  const x= ctr2[0] + i * Math.cos(angle2 * Math.PI/180);
  const y= ctr2[1] + i * Math.sin(angle2 * Math.PI/180);
  angle2-= 5;

  pts2.push([x, y])
}
const spirale2= new Path(ctx2, pts2)
spirale2.draw()

// canvas 3
const c3= domFn.select("#c3")
const ctx3= c3.getContext("2d")
const ctr3= [c3.width/2, c3.height/2]
let angleVar3= 0
let startTime3

(function loop3(time){
  if (!startTime3) {
    startTime3= time
    return requestAnimationFrame(loop3)
  }
  if (time < startTime3 + 40) return requestAnimationFrame(loop3);
  startTime3= time

  const pts= []
  let angle= 0
  const clearSize= Math.max(c3.width, c3.height) + 20;
  ctx3.clearRect(-10, -10, clearSize, clearSize);
  for (let i= 0; i< 300; i++){
    const x= ctr3[0] + i * Math.cos(angle * Math.PI/180);
    const y= ctr3[1] + i * Math.sin(angle * Math.PI/180);
    angle-= angleVar3;

    pts.push([x, y])
  }
  const spirale3= new Path(ctx3, pts)
  spirale3.draw()
  angleVar3+=0.01

  return requestAnimationFrame(loop3)
})()

// canvas 4
const c4= domFn.select("#c4")
const ctx4= c4.getContext("2d")
const w4= c4.width
const h4= c4.height
const size4= 10
const col4= w4/size4
const row4= h4/size4
const margin4= (col4-row4)/2

for (let j=row4; j<=h4; j+= row4){
  for (let i= margin4; i<w4; i+= col4){
    (new Triangle(ctx4, [i, j], row4).draw())  
  }
}
for (let j=0; j<h4; j+= row4){
  for (let i= -col4/2+margin4; i<w4; i+= col4){
    const color= i/5;
    (new Triangle(ctx4, [i, j], row4).draw(true, true, [color, 100, 50]))  
  }
}

// canvas 5
const c5= domFn.select("#c5")
const ctx5= c5.getContext("2d")
const w5= c5.width
const h5= c5.height
const size5= 10
const lineW5= 1
const col5= w5/size5
const row5= h5/size5

for (let i=0, j=0; i<w5; i+= col5, j++){
  const start5_1= [i, 0]
  const start5_2= [i, h5]
  const end5_1= [w5, h5-row5*j]
  const end5_2= [0, h5-row5*j]

  new Line(ctx5, start5_1, end5_1).draw(lineW5)
  new Line(ctx5, start5_2, end5_2).draw(lineW5)
}
for (let i=col5, j=1; i<=w5; i+= col5, j++){
  const start5_1= [i, 0]
  const start5_2= [i, h5]
  const end5_1= [0, row5*j]
  const end5_2= [w5, row5*j]

  new Line(ctx5, start5_1, end5_1).draw(lineW5)
  new Line(ctx5, start5_2, end5_2).draw(lineW5)
}

// canvas 6
const c6= domFn.select("#c6")
const ctx6= c6.getContext("2d")
const w6= c6.width
const h6= c6.height
const size6= 10
const lineW6= 1
const col6= w6/size6
const row6= h6/size6
let var6= w6 * 0.01
let flip6= false

function gridAnim(){
  const clearSize= Math.max(w6, h6) + 20
  ctx6.clearRect(-10, -10, clearSize, clearSize)

  for (let i=0, j=0; i<w6; i+= var6, j++){
    const start6_1= [i, 0]
    const start6_2= [i, h6]
    const end6_1= [w6, h6-row5*j]
    const end6_2= [0, h6-row6*j]

    new Line(ctx6, start6_1, end6_1).draw(lineW5)
    new Line(ctx6, start6_2, end6_2).draw(lineW5)
  }
  for (let i=var6, j=1; i<=w6; i+= var6, j++){
    const start6_1= [i, 0]
    const start6_2= [i, h6]
    const end6_1= [0, row6*j]
    const end6_2= [w6, row6*j]

    new Line(ctx6, start6_1, end6_1).draw(lineW5)
    new Line(ctx6, start6_2, end6_2).draw(lineW5)
  }

  flip6 = var6 > w6 * 0.2  ? true : flip6
  flip6 = var6 < w6 * 0.01 ? false : flip6
  flip6 ? var6-- : var6++
}

domFn.animate(gridAnim, 20)

//canvas 7
const c7= domFn.select("#c7")
const ctx7= c7.getContext("2d")
const ctr7= [c7.width/2, c7.height/2]
const size7= 150
const circles7= 20

function rosace(ctx, ctr, size, circles, color= [100,100,100]){
  const angle= 360/circles
  for (let i=0; i<360; i+=angle){
    const x= ctr[0] + size * Math.cos(i * Math.PI/180)
    const y= ctr[1] + size * Math.sin(i * Math.PI/180)
    new Circle(ctx, [x,y], size*0.8).draw(false, color)
  }
}
rosace(ctx7, ctr7, size7, circles7)

// canvas 8
const c8= domFn.select("#c8")
const ctx8= c8.getContext("2d")
const ctr8= [c8.width/2, c8.height/2]
const size8= 60
let circles8= 10
let flip8= false
let hue= 0

function rosaceAnim(){
  const clearSize= Math.max(c8.width, c8.height) +20
  ctx8.clearRect(-10, -10, clearSize, clearSize)
  ctx8.lineWidth= 2
  rosace(ctx8, ctr8, size8 * circles8*0.04, circles8, [hue, 100, 50])
  flip8 = circles8 > 90  ? true : flip8
  flip8 = circles8 < 10 ? false : flip8
  flip8 ? circles8-- : circles8++
  hue++
}

domFn.animate(rosaceAnim)

