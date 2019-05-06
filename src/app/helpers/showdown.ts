import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ShowdownService } from '../services/showdown.service';


export class MarkdownConsumer {
 
    @ViewChild('contentOutlet') 
    public contentoutlet: ElementRef<HTMLElement>;
    

    constructor(protected markdownRenderer: ShowdownService, private Render2: Renderer2) {}

    domInput(fileToRender: string,) {
        this.markdownRenderer.getFile(fileToRender).then((result: string) => {
            const parser = new DOMParser();
            const value = parser.parseFromString(result, 'text/html').body;
            console.log(this.contentoutlet)
            value.childNodes.forEach(element => {
                this.Render2.appendChild(this.contentoutlet.nativeElement, element);
            });
        });
    }

}