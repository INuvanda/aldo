import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import {Page} from './page';
import {PageService} from './page.service';
import {GraphApiError} from './graph-api-error';

/*
 * The Component showing a single page in detail.
 */

@Component({
    selector: 'page',
    template: `
        <div *ngIf='page'>
            <h1>{{page.name}} ({{page.fan_count}} Likes)</h1>
            <span class='app-action'>
                <button md-fab>
                    <i class='material-icons'>create</i>
                </button>
            </span>
        </div>
        <graph-api-error [graphApiError]='graphApiError'></graph-api-error>
        `
})
export class PageComponent implements OnInit {
    constructor(
        private pageService: PageService,
        private activatedRoute: ActivatedRoute,
        private locationService: Location) {}

    @Input()
    page: Page;

    /*
     * Any errors returned when trying to get the page info.
     */
    graphApiError: GraphApiError;

    ngOnInit() {
        this.activatedRoute
            .params
            .switchMap((params: Params) => 
                this.pageService.getPage(+params['id']))
            .subscribe(
                page => this.page = page,
                err => this.graphApiError = err);
    }

    /*
     * Post to a given String to this Page.
     */
    post(text: String): void {
        this.pageService
            .postMessage(this.page, text)
            .then(id => alert('Post erstellt: ' + id))
            .catch(err => this.graphApiError = err);
    }
}

