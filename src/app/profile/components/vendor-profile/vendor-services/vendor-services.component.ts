import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { constants, resources, vendorService, localStorageService , responseModel , urls , httpService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-services',
  templateUrl: './vendor-services.component.html',
  styleUrls: ['./vendor-services.component.scss']
})
export class VendorServicesComponent implements OnInit {

  startTypingAnimation: boolean = true;

  vendorServicesList: vendorService[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private actictedRoute: ActivatedRoute) {
      this.loadResources();
      this.storage.eraseLocalStorage("weds360#vendorServiceOnEdit");
  }

  ngOnInit() {
    this.getAllVendorServices();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllVendorServices() {
    this.ngxSpinner.show();
    let getAllItemsURL = `${urls.GET_ALL_VENDOR_SERVICES}/${constants.APP_IDENTITY_FOR_USERS}`;

    this.http.Get(getAllItemsURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        this.vendorServicesList = response.data as vendorService[];
        this.ngxSpinner.hide();
      } else {
        this.ngxSpinner.hide();
      }
    });
  };

  pageChange(pageNumber){

  };

  editEntity(id: any){
    this.router.navigate([`profile/en/vendor/services-action/update`]);
    let targetTheme = this.vendorServicesList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#vendorServiceOnEdit" , targetTheme);
  };

  navigateToCreateNewService(){
    this.router.navigate(['profile/en/vendor/services-action/new']);
  }

  //#region load gallery
  async convertURLtoFile(image){
    // image = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
    let response = await fetch(image);
    let data = await response.blob();
    let metadata = {
      type: `image/${image.split('.').pop()}`
    };

    return new File([data], image.split('/').pop() , metadata);
  }
  //#endregion

  ngAfterViewInit(): void {
    this.loadScripts();
  };

  loadScripts() {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };

  
}
