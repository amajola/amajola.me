import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  displayImage: String = '../../../assets/contact_me/FullSizeRender.JPG';
  jumboTronHeader: String =  'Contact';
  constructor() { }

  ngOnInit() {
  }

}
