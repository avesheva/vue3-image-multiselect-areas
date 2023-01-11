export default class CanvasApiClass {
  protected canvasElement: HTMLCanvasElement

  private readonly ctx: CanvasRenderingContext2D | null

  private isDrawing = false

  private startX = 0

  private startY = 0

  private lineColor = 'black'

  private lineWidth = 2

  private drawnRectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  constructor(canvasElement: HTMLCanvasElement, lineWidth: number, lineColor: string) {
    this.canvasElement = canvasElement
    this.ctx = canvasElement.getContext('2d')
    this.lineWidth = lineWidth
    this.lineColor = lineColor

    if (!this.ctx) throw Error('Can\'t get canvas content!')

    canvasElement.addEventListener('mousedown', this.mouseDownHandler)
    canvasElement.addEventListener('mousemove', this.mouseMoveHandler)
    canvasElement.addEventListener('mouseup', this.mouseUpHandler)
  }

  private clearOverlay() {
    if (!this.ctx) return

    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
    this.ctx.strokeStyle = this.lineColor
    this.ctx.lineWidth = this.lineWidth

    this.drawnRectangle = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
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

        this.drawnRectangle.x = this.startX
        this.drawnRectangle.y = this.startY
        this.drawnRectangle.width = e.offsetX - this.startX
        this.drawnRectangle.height = e.offsetY - this.startY

        this.ctx.beginPath()
        this.ctx.rect(
          this.drawnRectangle.x,
          this.drawnRectangle.y,
          this.drawnRectangle.width,
          this.drawnRectangle.height,
        )
        this.ctx.stroke()
      })
    }
  }

  private mouseUpHandler = () => {
    if (this.isDrawing) {
      this.isDrawing = false
      this.canvasElement.style.cursor = 'default'

      if (this.drawnRectangle.width > 0 && this.drawnRectangle.height > 0) {
        this.canvasElement.dispatchEvent(
          new CustomEvent('area-selected', { detail: this.drawnRectangle }),
        )
      }

      this.clearOverlay()
    }
  }
}