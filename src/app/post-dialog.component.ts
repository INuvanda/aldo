import {Component, Input} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {Observable} from 'rxjs/Observable';

import {Page, ContentType} from './page';
import {PostService} from './post.service';
import {Ressource} from './app';

@Component({
    selector: 'post-dialog',
    templateUrl: './_post-dialog.component.html',
    styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {
    constructor(
        protected mdDialogRef: MdDialogRef<Promise<string>>,
        protected postService: PostService) {}

    @Input()
    page: Page;

    /*
     * ContentType selected by the user.
     */
    contentType = ContentType.Link;

    /*
     * Text entered by the user.
     */
    text = '';

    /*
     * Link entered by the user.
     */
    link = '';

    /*
     * Photo url entered by the user.
     */
    photo?: Ressource;

    /*
     * Video url entered by the user.
     */
    video?: Ressource;

    /*
     * Get the uri of the attachment to be published, if any.
     */
    get ressource(): Ressource|null {
        return this[ContentType[this.contentType].toLowerCase()];
    }

    /*
     * Post to a given String to this Page.
     */
    post() {
        this.mdDialogRef.close(
            this.postService.create(
                this.page,
                this.text,
                this.contentType,
                this.ressource));
    }
}

