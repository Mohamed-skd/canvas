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

const line= new Line(ctx1, [100, 100], [500, 150])
line.draw()

const circle= new Circle(ctx1, [200, 200], 50)
circle.draw()

// canvas 2
const c2= domFn.select("#c2")
const ctx2= c2.getContext("2d")
const center= [c2.width/2, c2.height/2]
let angle= 0

for (let i= 0; i< 300; i++){
  const x= center[0] + i * Math.cos(angle);
  const y= center[1] + i * Math.sin(angle);
  angle++;

  (new Circle(ctx2, [x,y], 50)).draw()
}
