import { httpService } from './../../services/http/http';
import { Injectable } from '@angular/core';
import { urls } from '../urls';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private httpService: httpService) { }

  async getTags(){
    return this.httpService.Get(`${urls.GET_ALL_TAGS}/${constants.APP_IDENTITY_FOR_USERS}` , {} ).toPromise();
  };

  async getCategories(){
    return this.httpService.Get(`${urls.GET_ALL_CATEGORIES}/${constants.APP_IDENTITY_FOR_USERS}` , {} ).toPromise();
  };

  async getAreas(){
    return this.httpService.Get(`${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}` , {} ).toPromise();
  };

  async getPostsAsLookups(){
    return this.httpService.Get(`${urls.GET_ALL_POSTS_AS_LOOKUPS}/${constants.APP_IDENTITY_FOR_USERS}` , {} ).toPromise();
  };

  async getVendorsAsLookups(){
    return this.httpService.Get(`${urls.GET_ALL_VENDORS}/${constants.APP_IDENTITY_FOR_USERS}` , {} ).toPromise();
  };
}
