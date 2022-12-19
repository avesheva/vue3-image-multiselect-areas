export default class CanvasApiClass {
  protected canvasElement: HTMLCanvasElement

  private readonly ctx: CanvasRenderingContext2D | null

  private isDrawing = false

  private startX = 0

  private startY = 0

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement
    this.ctx = canvasElement.getContext('2d')

    if (!this.ctx) throw Error('Can\'t get canvas content!')

    canvasElement.addEventListener('mousedown', this.mouseDownHandler)
    canvasElement.addEventListener('mousemove', this.mouseMoveHandler)
    canvasElement.addEventListener('mouseup', this.mouseUpHandler)
  }

  private clearOverlay() {
    if (!this.ctx) return

    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
    this.ctx.strokeStyle = '#ff0000'
    this.ctx.lineWidth = 2
  }

  private mouseDownHandler = (e: MouseEvent) => {
    this.startX = e.offsetX
    this.startY = e.offsetY
    this.isDrawing = true

    this.canvasElement.style.cursor = 'crosshair'
  }

  private mouseMoveHandler = (e: MouseEvent) => {
    if (this.isDrawing) {
      requestAnimationFrame(() => {
        if (!this.ctx) return

        this.clearOverlay()

        this.ctx.beginPath()
        this.ctx.rect(this.startX, this.startY, e.offsetX - this.startX, e.offsetY - this.startY)
        this.ctx.stroke()
      })
    }
  }

  private mouseUpHandler = () => {
    if (this.isDrawing) {
      this.isDrawing = false
      this.canvasElement.style.cursor = 'default'
    }
  }
}