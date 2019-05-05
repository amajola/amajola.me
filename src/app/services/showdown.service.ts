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
    private Render: Renderer2;

    constructor(private Http: HttpClient, private RenderFactory: RendererFactory2) {
        this.Render = this.RenderFactory.createRenderer(null, null)
        this.Converter = new Showdown.Converter();
    }

    getFile(Path: string) {
        return new Promise(resolve => {
            this.Http.get(Path, {responseType: 'text'}).toPromise().then(result => {
                const htmlValue = this.Render.createElement('div');
                result = this.Converter.makeHtml(result);
                htmlValue.innerHTML = result;
                resolve (htmlValue);
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