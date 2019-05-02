import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stackArray: Array<string> = [];
  stackImg = [];
  imagedata: any;
  config: any;
  fullpage_api: any;

  constructor() {

    // for more details on config options please visit fullPage.js docs
    this.config = {
      
      // fullpage options
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      menu: '#menu',
      paddingTop: '6%',
      animateAnchor: true,

      // fullpage callbacks
      afterResize: () => {
        console.log('After resize');
      },
    };
  }

  ngOnInit() {}

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  Changes() {
    console.log(this.stackArray);
  }


}
