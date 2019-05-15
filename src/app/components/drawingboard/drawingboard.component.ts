import { DrawingboardColor } from './../../models/drawingboard';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import colors from './colors';

@Component({
  selector: 'app-drawingboard',
  templateUrl: './drawingboard.component.html',
  styleUrls: ['./drawingboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawingboardComponent implements AfterViewInit {
  private context: CanvasRenderingContext2D;

  // Template reference to the canvas element
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;

  // Tracks whether or not the user has drawn
  // on the board, and if they have, will mark
  // the board as dirty
  @HostBinding('class.is-dirty') public userHasDrawn: boolean = false;

  // Gives safe acces to the canvas
  // element
  public get canvas(): HTMLCanvasElement {
    return this.canvasEl.nativeElement;
  }

  // Track whether or not the use is drawing
  drawBool: Boolean = false;

  // Tracking stors for updating the canvas
  public clickX: any[] = [];
  public clickY: any[] = [];
  public clickDrag: any[] = [];
  public clickColor: any[] = [];

  // The color list from './color.ts'
  public colors: DrawingboardColor[] = colors;

  // The current color of the drawing tool
  public activeDrawColor: DrawingboardColor = this.colors.find(
    i => i.name === 'black'
  );

  constructor(protected readonly changedetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.context = (this.canvasEl
      .nativeElement as HTMLCanvasElement).getContext('2d');

    this.onresize();
  }

  // Becuase canavas needs a width and a height context,
  // and because we need to have the drawing board adapt
  // to different screen sizes, we set the width and the
  // height of the canvas element to the width and the
  // height of the window
  @HostListener('window:resize') public onresize(): void {
    this.canvasEl.nativeElement.width = window.innerWidth;
    this.canvasEl.nativeElement.height = window.innerHeight;

    // because the context of our canvas has changed, we
    // need to clear it
    this.clearBoard();
  }

  // Will select a new color for the user to draw with
  public setColor(color: DrawingboardColor): void {
    this.activeDrawColor = color;
  }

  // Resets the state of the board so that the user has
  // a clean canvas to draw on.
  public clearBoard(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.clickColor = [];
  }

  // Tracks mouse movement if the user is busy drawing,
  // and draws a line to the canvas
  public onmousemove($event) {
    if (this.drawBool) {
      this.addClick(
        $event.pageX - this.canvasEl.nativeElement.offsetLeft,
        $event.pageY - this.canvasEl.nativeElement.offsetTop,
        true
      );
      this.redraw();
    }
  }

  public onmousedown($event) {
    const mouseX = $event.pageX - this.canvasEl.nativeElement.offsetLeft;
    const mouseY = $event.pageY - this.canvasEl.nativeElement.offsetTop;

    this.drawBool = true;
    this.addClick(mouseX, mouseY, 0);
    this.redraw();
  }

  public stopDrawing(): void {
    this.drawBool = false;
    this.changedetector.detectChanges();
  }

  private addClick(x, y, dragging) {
    if (!this.userHasDrawn) {
      this.userHasDrawn = true;
      this.changedetector.detectChanges();
    }

    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
    this.clickColor.push(this.activeDrawColor.value);
  }

  private redraw() {
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
