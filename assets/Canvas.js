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

  draw(fill= false, color= [100, 100, 100]){
    const triangle= ()=>{
      let nX= this.start[0]
      let nY= this.start[1]
      let angle= 0
      this.ctx.moveTo(...this.start)

      for (let i=0; i<3; i++){
	const x= nX + this.size * Math.cos(angle * Math.PI/180);
	const y= nY + this.size * Math.sin(angle * Math.PI/180);
	this.ctx.lineTo(x, y);

	nX= x
	nY= y
	angle-= 120;
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

