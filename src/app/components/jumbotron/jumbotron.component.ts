import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit, OnChanges{

  @Input() ViewImg;
  @Input() Header;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {

  }
}
