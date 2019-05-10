// tslint:disable:no-string-literal
import { ElementRef, ViewChild } from '@angular/core';
import { ShowdownService } from '../services/showdown.service';

export class MarkdownConsumer {
  @ViewChild('contentOutlet')
  public contentoutlet: ElementRef<HTMLElement>;

  // This state tracker can be used to have
  // a loading state when the markdown is
  // being fetched
  public fetchingMarkdown: boolean = true;

  constructor(
    protected pathToMarkdown: string,
    protected markdownRenderer: ShowdownService
  ) {
    this._initializerenderer();
  }

  private _initializerenderer(): void {
    // If the 'ngAfterViewInit' method has not been
    // implemented, we need to throw an error
    if (!this['ngAfterViewInit']) throw 0;

    // If the the method has been implemented,
    // we store the value of the original function
    const ngAVI: Function = this['ngAfterViewInit'];

    // We wrap the function with a custom function
    // that calls the original function as well as
    // some other functions
    this['ngAfterViewInit'] = () => {
      ngAVI.call(this);

      this.renderMarkdown();
    };
  }

  // Renders the markdown using the path provided in
  // the constructor and inserts it into the content
  // outlet
  private async renderMarkdown(): Promise<void> {
    const file = (await this.markdownRenderer.getFile(
      this.pathToMarkdown
    )) as string;

    this.contentoutlet.nativeElement.innerHTML = file;

    // All compiled markdown will be rendered into
    // of '.markdown-wrapper' so that styles can be
    // scoped to only markdown
    this.contentoutlet.nativeElement.classList.add('markdown-wrapper');

    this.fetchingMarkdown = false;
  }
}
