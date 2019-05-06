import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss']
})
export class MyWorkComponent implements OnInit {

  displayImage: String = "../../../assets/work/amajola.jpg"
  jumboTronHeader: String =  "My Work"
  constructor() { }

  ngOnInit() {
  }

}
