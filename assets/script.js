import { NumberFn, StringFn, DateFn, FetchFn } from "./scripts/lib.js";
import { DomFn } from "./scripts/client.js";
import { Line, Circle, Square, Triangle, Path } from "./Canvas.js"

// UTILS
const numFn = new NumberFn();
const strFn = new StringFn();
const dateFn = new DateFn();
const fetchFn = new FetchFn();
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
const path= new Path(ctx1, [
  [50, 110],
  [180, 150],
  [50, 300],
  [80, 380],
  [300, 380],
  [350, 260],
  [450, 120],
  [580, 350]
])
path.draw(5)

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

