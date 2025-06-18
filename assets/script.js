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
const width= c1.width
const height= c1.height

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
const center= [c2.width/2, c2.height/2]
const pts= []
let angle= 0

for (let i= 0; i< 300; i+= 0.2){
  const x= center[0] + i * Math.cos(angle);
  const y= center[1] + i * Math.sin(angle);
  angle-= 0.05;

  pts.push([x, y])
}
const spirale= new Path(ctx2, pts)
spirale.draw()

// canvas 3
const c3= domFn.select("#c3")
const ctx3= c3.getContext("2d")

