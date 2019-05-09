import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-page-text',
  templateUrl: './page-text.component.html',
  styleUrls: ['./page-text.component.scss'],
})
export class PageTextComponent implements OnInit {

  Source: string;
  MarkdownPath: any = {
    about: '../../../assets/about/Lopem.md',
    work: '../../assets/work/Lopem.md',
    skill: '../../assets/skills/Lopem.md',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const path = this.router.url.split(':');
    if (path[1] === 'about') {
      this.Source = this.MarkdownPath.about;
    } else if (path[1] === 'work') {
      this.Source = this.MarkdownPath.work;
    } else {
      this.Source = this.MarkdownPath.skill;
    }
  }
}
