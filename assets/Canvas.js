// base
export class Line {
  constructor(ctx, start, end){
    this.ctx= ctx
    this.start= start
    this.end= end
  }

  draw(width= 1, color= [100, 100, 100]){
    this.ctx.beginPath()
    this.ctx.strokeStyle= this.#getColor(color)
    this.ctx.lineWidth= width
    this.ctx.moveTo(...this.start)
    this.ctx.lineTo(...this.end)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  #getColor(color){
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
  }
}

export class Circle {
  constructor(ctx, center, radius) {
    this.ctx= ctx
    this.center= center
    this.radius= radius
  }

  draw(fill=false, color= [100, 100, 100]){
    const circle= ()=>this.ctx.arc(...this.center, this.radius, 0, Math.PI * 2)
    
    this.ctx.beginPath()
    if (fill) {
      this.ctx.fillStyle= this.#getColor(color)
      circle()
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle= this.#getColor(color)
      circle()
      this.ctx.stroke()
    }
    this.ctx.closePath()
  }

  #getColor(color){
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
  }
}

export class Square {
  constructor(ctx, topLeftCorner, size){
    this.ctx= ctx
    this.start= topLeftCorner
    this.size= size
  }

  draw(fill=false, color= [100, 100, 100]){
    const square= ()=> this.ctx.rect(this.start[0], this.start[1], this.size, this.size)

    this.ctx.beginPath()
    if (fill) {
      this.ctx.fillStyle= this.#getColor(color)
      square()
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle= this.#getColor(color)
      square()
      this.ctx.stroke()
    }
    this.ctx.closePath()
  }

  #getColor(color){
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
  }
}

export class Triangle {
  constructor(ctx, bottomLeftCorner, size){
    this.ctx= ctx
    this.start= bottomLeftCorner
    this.size= size
  }

  draw(fill= false, flip=false, color= [100, 100, 100]){
    const triangle= ()=>{
      let nX= this.start[0]
      let nY= this.start[1]
      let angle= 60
      this.ctx.moveTo(...this.start)

      for (let i=0; i<3; i++){
	const x= nX + this.size * Math.cos(angle * Math.PI/180);
	const y= nY + this.size * Math.sin(angle * Math.PI/180);
	this.ctx.lineTo(x, y);

	nX= x
	nY= y
	angle-= flip ? 120 : -120;
      }
    }

    this.ctx.beginPath()
    if (fill) {
      this.ctx.fillStyle= this.#getColor(color)
      triangle()
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle= this.#getColor(color)
      triangle()
      this.ctx.stroke()
    }
    this.ctx.closePath()
  }

  #getColor(color){
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
  }
}

export class Path {
  constructor(ctx, path){
    this.ctx= ctx
    this.path= path
  }

  draw(width= 1, color= [100, 100, 100]){
    this.ctx.beginPath()
    this.ctx.strokeStyle= this.#getColor(color)
    this.ctx.lineWidth= width
    this.ctx.moveTo(...this.path[0])
    for (let i=1; i<this.path.length; i++){
      this.ctx.lineTo(...this.path[i])
    }
    this.ctx.stroke()
    this.ctx.closePath()
  }

  #getColor(color){
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
  }
}

// utils
export function clearCanvas(c, ctx){
  const clearSize= Math.max(c.width, c.height) + 20
  ctx.clearRect(-10, -10, clearSize, clearSize)
}

export function animate(cb, frameDelay= 40){
  let startTime
  function loop(time){
    if (!startTime){
      startTime= time
      return requestAnimationFrame(loop)
    }
    if (time < startTime + frameDelay){
      return requestAnimationFrame(loop)
    }
    startTime= time
    cb()
    return requestAnimationFrame(loop)
  }
  return loop()
}

// cmps
// 1 
export function spirale(ctx, origin, size, angleVar= 2, color=[100,100,100], lineW=2){
  const pts= []
  let angle= 0

  for (let i= 0; i< size; i++){
    const x= origin[0] + i * Math.cos(angle * Math.PI/180);
    const y= origin[1] + i * Math.sin(angle * Math.PI/180);
    angle-= angleVar;

    pts.push([x, y])
  }
  const spirale= new Path(ctx, pts)
  spirale.draw(lineW, color)
}
export function n1(canvas){
  const ctx= canvas.getContext("2d")
  const ctr= [canvas.width/2, canvas.height/2]

  spirale(ctx, ctr, canvas.width/2)
}

// 2
export function n2(canvas){
  const ctx= canvas.getContext("2d")
  const ctr= [canvas.width/2, canvas.height/2]
  let angleVar= 0
  let hue= Math.random() * 361

  function spiraleAnim(){
    clearCanvas(canvas, ctx)
    spirale(ctx, ctr, canvas.width/2, angleVar, [hue, 100, 50], 5)
    angleVar+=0.02
    angleVar= angleVar % 360
    hue++
    hue= hue % 360
  }
  animate(spiraleAnim)
}

// 3
export function grid(ctx, w, h, col, row, gap, color= [100,100,100], lineW= 2){
  for (let i=0, j=0; i<w; i+= gap, j++){
    const start3_1= [i, 0]
    const start3_2= [i, h]
    const end3_1= [w, h-row*j]
    const end3_2= [0, h-row*j]

    new Line(ctx, start3_1, end3_1).draw(lineW, color)
    new Line(ctx, start3_2, end3_2).draw(lineW, color)
  }
  for (let i=col, j=1; i<=w; i+= gap, j++){
    const start3_1= [i, 0]
    const start3_2= [i, h]
    const end3_1= [0, row*j]
    const end3_2= [w, row*j]

    new Line(ctx, start3_1, end3_1).draw(lineW, color)
    new Line(ctx, start3_2, end3_2).draw(lineW, color)
  }
}
export function n3(canvas){
  const ctx= canvas.getContext("2d")
  const w= canvas.width
  const h= canvas.height
  const size= canvas.width/(canvas.width * 0.1)
  const col= w/size
  const row= h/size

  grid(ctx, w, h, col, row, col)
}

// 4
export function n4(canvas){
  const ctx= canvas.getContext("2d")
  const w= canvas.width
  const h= canvas.height
  const size= canvas.width/(canvas.width * 0.1)
  const col= w/size
  const row= h/size
  let gap= w * 0.01
  let flip= false
  let hue= Math.random() * 361

  function gridAnim(){
    clearCanvas(canvas, ctx)
    grid(ctx, w, h, col, row, gap, [hue, 100, 50], 5)
    flip = gap > w * 0.2  ? true : flip
    flip = gap < w * 0.01 ? false : flip
    flip ? gap-- : gap++
    hue++
    hue= hue % 360
  }
  animate(gridAnim)
}

// 5
export function rosace(ctx, ctr, size, circles=20, color= [100,100,100]){
  const angle= 360/circles
  for (let i=0; i<360; i+=angle){
    const x= ctr[0] + size * Math.cos(i * Math.PI/180)
    const y= ctr[1] + size * Math.sin(i * Math.PI/180)
    new Circle(ctx, [x,y], size*0.6).draw(false, color)
  }
}
export function n5(canvas){
  const ctx= canvas.getContext("2d")
  const ctr= [canvas.width/2, canvas.height/2]
  const size= canvas.width/5

  ctx.lineWidth= 2
  rosace(ctx, ctr, size)
}

// 6
export function n6(canvas){
  const ctx= canvas.getContext("2d")
  const ctr= [canvas.width/2, canvas.height/2]
  const size= canvas.width/10
  let circles= 10
  let flip= false
  let hue= Math.random() * 361

  function rosaceAnim(){
    clearCanvas(canvas, ctx)
    rosace(ctx, ctr, size * circles*0.04, circles, [hue, 100, 50])
    flip = circles > 90  ? true : flip
    flip = circles < 10 ? false : flip
    flip ? circles-- : circles++
    hue++
    hue= hue % 360
  }

  ctx.lineWidth= 5
  animate(rosaceAnim)
}

// 7
export function n7(canvas){
  const ctx= canvas.getContext("2d")
  const w= canvas.width
  const h= canvas.height
}

