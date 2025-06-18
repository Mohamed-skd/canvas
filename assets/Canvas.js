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
    this.ctx.beginPath()
    
    if (fill) {
      this.ctx.fillStyle= this.#getColor(color)
      this.ctx.arc(...this.center, this.radius, 0, Math.PI * 2)
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle= this.#getColor(color)
      this.ctx.arc(...this.center, this.radius, 0, Math.PI * 2)
      this.ctx.stroke()
    }

    this.ctx.closePath()
  }

  #getColor(color){
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
  }
}

export class Square {}

export class Triangle {}

export class Path {}

