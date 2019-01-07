import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @ViewChild('myCanvas') canvasRef: ElementRef;

  constructor() { }

  ngOnInit() {
    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(150, 75, 150, 75);

    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();

  }




}
