import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';



@Component({
  selector: 'app-drawingboard',
  templateUrl: './drawingboard.component.html',
  styleUrls: ['./drawingboard.component.scss']
})
export class DrawingboardComponent implements  AfterViewInit {

   /** Template reference to the canvas element */
   @ViewChild('canvas') canvasEl: ElementRef;

   /** Canvas 2d context */
   drawBool: Boolean = false;
   clickX = new Array();
   clickY = new Array();
   clickDrag = new Array();

   colorPurple = '#cb3594';
   colorGreen = '#659b41';
   colorYellow = '#ffcf33';
   colorBrown = '#986928';
   colorBlack = '#000000';

   curColor = this.colorPurple;
   clickColor = new Array();

   private context: CanvasRenderingContext2D;

   constructor() {}

   ngAfterViewInit() {
     this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
   }

   onmove($event) {
    if (this.drawBool) {
      this.addClick($event.pageX - this.canvasEl.nativeElement.offsetLeft,
                    $event.pageY - this.canvasEl.nativeElement.offsetTop, true);
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
     this.addClick($event.pageX - this.canvasEl.nativeElement.offsetLeft,
                    $event.pageY - this.canvasEl.nativeElement.offsetTop, 0);
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
      this.clickColor.push(this.curColor);
      // console.log(`this.clickX ${this.clickX} \n this.clickY ${this.clickY} \n this.clickDrag ${this.clickDrag}`);
   }

   redraw() {
    // this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas

    this.context.strokeStyle = '#000000';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 10;

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
