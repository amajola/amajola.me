import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[app-button], a[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @HostBinding('class.outlined') @Input() public outlined: boolean = false;

  constructor() {}

  ngOnInit() {}
}
