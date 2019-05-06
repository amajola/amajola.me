import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  displayImage: String = "../../../assets/skills/IMG_0434.jpg"
  jumboTronHeader: String =  "Skills"
  constructor() { }

  ngOnInit() {
  }

}
