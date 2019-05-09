import { ViewChild } from '@angular/core';
import { MarkdownConsumer } from './showdown';
import { ShowdownService } from '../services/showdown.service';

export enum PageState {
  idle,
  info,
}

export class PageBase extends MarkdownConsumer {
  public pagestate: PageState = PageState.idle;

  public getState(): string {
    return PageState[this.pagestate];
  }
  public setState(nextstate: PageState): void {
    this.pagestate = nextstate;
  }

  // @ViewChild()
  constructor(pathToMarkdown: string, showdownservice: ShowdownService) {
    super(pathToMarkdown, showdownservice);
  }
}
