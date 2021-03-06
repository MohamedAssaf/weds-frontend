import { Router } from '@angular/router';
import { constants, httpService, responseModel, urls, weddingWebsite } from './../../core';


export class weddingTemplatesHelper {
  weddingWebsite: weddingWebsite = new weddingWebsite();
  currentUserEmail: any;

  constructor(private httpService: httpService, private router: Router){
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
  };

  getWeddingWebisteData(){

  };

  getWeddingWebsiteOwner(routeURL){
    let ownerURL = `${urls.GET_WEDDING_OWNER_EMAIL}/${constants.APP_IDENTITY_FOR_USERS}/${this.currentUserEmail}?routeURL=${routeURL}`;

    this.httpService.Get(ownerURL , {}).subscribe((response: responseModel) => {
      if(!response.error){
        let ownerEmail = response.data;
        console.log(ownerEmail , this.currentUserEmail)
        this.validateAuthorityToViewWeddingWebsite(ownerEmail);
      }
    });
  };

  validateAuthorityToViewWeddingWebsite(ownerEmail){
    if(!this.weddingWebsite.isPublished){
      if(this.currentUserEmail != ownerEmail){
        this.router.navigateByUrl('/'); //TODO: Navigate to the 404!
      }
    }
  };
};
