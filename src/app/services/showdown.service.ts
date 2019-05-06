import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {MarkdownOptions} from '../models/showdown-opt';
import {HttpClient} from "@angular/common/http";
import * as Showdown from 'showdown';

const DefaultOptions: MarkdownOptions =  {
    tables: true,
    noHeaderId: true,
    ghMentions: true,
    strikethrough: true,
    tablesHeaderId: true,
    headerLevelStart: 1,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
    parseImgDimensions: true,
    excludeTrailingPunctuationFromURLs: true,
    requireSpaceBeforeHeadingText: true
}

@Injectable({
    providedIn: "root",
})
export class ShowdownService {

    private Converter;

    constructor(private Http: HttpClient) {
        this.Converter = new Showdown.Converter()
    }

    getFile(Path: string) {
        return new Promise(resolve => {
            this.Http.get(Path, {responseType: 'text'}).toPromise().then(result => {
                result = this.Converter.makeHtml(result);
                resolve (result);
            }).catch(err => console.log(err));
        });
    }

    AddOption(optionKey: string, value: any): boolean {
        if (this.Converter.getOption(optionKey)) {
            this.Converter.setOption(optionKey, value);
            return true;
        } else return false;
    }

    get ShowGlobalOptions(): object {
        return this.Converter.getOptions();
    }
}