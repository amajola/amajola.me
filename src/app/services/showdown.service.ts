import { Component, OnInit, Inject, ElementRef, Injectable } from '@angular/core';
import * as showdown from 'showdown';
import {MarkdownOptions} from '../models/showdown-opt';
import {HttpClient} from "@angular/common/http";

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
  providedIn: 'root',
})
export class ShowdownService {
 
    public Converter;
    public HTML: object;
    private Path: string;

    constructor(private Http: HttpClient) {
      this.Converter = new showdown.Converter(DefaultOptions);
    }

    ConvertMarkdown(path: string) {  
        return new Promise(resolve => {
          this.Http.get(path, {responseType: 'text'}).toPromise().then(result => {
              result = this.Converter.makeHtml(result)
               resolve (result);
          }).catch(err => console.log(err));
        });
    };



    AddOption(optionKey: string, value: any): boolean {
        if (this.Converter.getOption(optionKey)) {
            this.Converter.setOption(optionKey, value);
            return true;
        } else return false;
    }

    set Location(reletivePath: string) {
        this.Path = reletivePath
    }

    async ConvertedHtml() {
        const doc = await this.ConvertMarkdown(this.Path);
        return doc
    }

    get ShowGlobalOptions(): object {
        return this.Converter.getOptions();
    }
}