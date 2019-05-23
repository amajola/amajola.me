import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit, AfterViewInit {

  @Input() public Title: string;
  @Input() public Level: string;
  @ViewChild('Indicator') Indicator: ElementRef;
  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.Indicator.nativeElement.style.width = this.Level;
  }

}
