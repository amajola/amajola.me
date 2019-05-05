import { ElementRef, ViewChild } from '@angular/core';
import { ShowdownService } from '../services/showdown.service';


export class MarkdownConsumer {
 
    @ViewChild('contentOutlet') 
    public contentoutlet: ElementRef<HTMLElement>;
    

    constructor(fileToRender: string, protected markdownRenderer: ShowdownService) {
        markdownRenderer.getFile(fileToRender).then((result: object) => {
            // Please Help Me Here I have the Markdown Rendered
        });
    }

}