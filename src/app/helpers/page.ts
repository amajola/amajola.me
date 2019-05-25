import { MarkdownConsumer } from './showdown';
import { ShowdownService } from '../services/showdown.service';

export enum PageState {
  idle,
  info,
}

export class PageBase extends MarkdownConsumer {
  public isMobile: boolean;

  public mediaQuery = window.matchMedia('screen and (max-width: 550px)');

  public pagestate: PageState = PageState.idle;

  public getState(): string {
    return PageState[this.pagestate];
  }
  public setState(nextstate: PageState): void {
    this.pagestate = nextstate;
  }

  constructor(pathToMarkdown: string, showdownservice: ShowdownService) {
    super(pathToMarkdown, showdownservice);
  }
}
