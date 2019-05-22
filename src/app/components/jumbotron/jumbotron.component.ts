import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit, OnChanges {
  @Input() public imageSrc: string;

  @Input() public title: string;

  @Output() public buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {}
}
