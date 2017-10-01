import {ReflectiveInjector} from '@angular/core';

import {GraphApiObject, GraphApiObjectType, DUMMY_GRAPH_API_OBJECT_TYPE}
    from './graph-api-object';
import {UtilService} from './util.service';
import {ConfService} from './conf.service';

/*
 * Classes related to Facebook profiles.
 *
 * Profiles are Users, Pages, Groups, Events and Applications.
 */

/*
 * A Facebook profile as returned by the Facebook API.
 */
export interface ProfileType extends GraphApiObjectType {
    name: string;
}

/*
 * A Facebook profile as used internally.
 */
export class Profile extends GraphApiObject {
    protected confService: ConfService = ReflectiveInjector
        .resolveAndCreate([UtilService])
        .get(UtilService)
        .inject(ConfService);

    /*
     * Get the url to the icon for this Profile.
     */
    get picture() {
        return this.confService.fb.apiUrl + '/' + this.id + '/picture';
    }
}
export interface Profile extends ProfileType {}

/*
 * The simplest valid profile.
 *
 * This exists, so the Users and Pages can use it to build their dummy 
 * constants.
 */
export const DUMMY_PROFILE_TYPE: ProfileType = {
    ...DUMMY_GRAPH_API_OBJECT_TYPE,
    name: ''
};

