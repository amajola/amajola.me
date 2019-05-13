import { DrawingboardColor } from './../../models/drawingboard';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import colors from './colors';

@Component({
  selector: 'app-drawingboard',
  templateUrl: './drawingboard.component.html',
  styleUrls: ['./drawingboard.component.scss'],
})
export class DrawingboardComponent implements AfterViewInit {
  private context: CanvasRenderingContext2D;

  /** Template reference to the canvas element */
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;

  public get canvas(): HTMLCanvasElement {
    return this.canvasEl.nativeElement;
  }

  /** Canvas 2d context */
  drawBool: Boolean = false;

  public clickX: any[] = [];
  public clickY: any[] = [];
  public clickDrag: any[] = [];
  public clickColor: any[] = [];

  public colors: DrawingboardColor[] = colors;

  public activeDrawColor: DrawingboardColor = this.colors.find(
    i => i.name === 'black'
  );

  constructor() {}

  ngAfterViewInit() {
    this.context = (this.canvasEl
      .nativeElement as HTMLCanvasElement).getContext('2d');

    this.onresize();
  }

  @HostListener('window:resize') public onresize(): void {
    this.canvasEl.nativeElement.width = window.innerWidth;
    this.canvasEl.nativeElement.height = window.innerHeight;
  }

  public setColor(color: DrawingboardColor): void {
    this.activeDrawColor = color;
  }

  public clearBoard(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.clickColor = [];
  }

  onmove($event) {
    if (this.drawBool) {
      this.addClick(
        $event.pageX - this.canvasEl.nativeElement.offsetLeft,
        $event.pageY - this.canvasEl.nativeElement.offsetTop,
        true
      );
      this.redraw();
    }
    // console.log(`PageX ${$event.pageX} \n Page ${$event.pageY} Fail`);
  }

  onLeave() {
    this.drawBool = false;
  }

  onDown($event) {
    const mouseX = $event.pageX - this.canvasEl.nativeElement.offsetLeft;
    const mouseY = $event.pageY - this.canvasEl.nativeElement.offsetTop;

    this.drawBool = true;
    this.addClick(
      $event.pageX - this.canvasEl.nativeElement.offsetLeft,
      $event.pageY - this.canvasEl.nativeElement.offsetTop,
      0
    );
    this.redraw();
    //  console.log(`PageX ${$event.pageX} \n Page ${$event.pageY}`);
  }

  onUp() {
    this.drawBool = false;
  }

  addClick(x, y, dragging) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
    this.clickColor.push(this.activeDrawColor.value);
  }

  redraw() {
    // this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas

    this.context.strokeStyle = '#000000';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 2;

    for (let i = 0; i < this.clickX.length; i++) {
      this.context.beginPath();
      if (this.clickDrag[i] && i) {
        this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
      } else {
        this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
      }
      this.context.lineTo(this.clickX[i], this.clickY[i]);
      this.context.closePath();
      this.context.strokeStyle = this.clickColor[i];
      this.context.stroke();
    }
  }
}
