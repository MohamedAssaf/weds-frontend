import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { dress, vendorService, LookupsService, constants, urls, httpService, responseModel, localStorageService, tag, category, vendor, resources } from 'src/app/core';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-vendor-services-dress-form',
  templateUrl: './vendor-services-dress-form.component.html',
  styleUrls: ['./vendor-services-dress-form.component.scss']
})
export class VendorServicesDressFormComponent implements OnInit {
  dress = new dress();
  service = new vendorService();
  vendor = new vendor();
  editingMode = "new";
  coverPhotoSource = "";
  that = this;
  tagsAr: tag[] = [];
  tagsEn: tag[] = [];
  categories: category[] = [];
  currentUserEmail: string;
  dressCutList = constants.DRESS_CUT;
  lang: string;
  labels: any = {};
  constructor(private router: Router,
    @Inject(DOCUMENT) private document: any, private elementRef: ElementRef, private http: httpService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private storage: localStorageService, private lookupsService: LookupsService, private resources: resources,
    private ngxSpinner: NgxSpinnerService) {
    this.currentUserEmail = atob(window.localStorage.getItem("weds360#email"));
    this.vendor = this.storage.getLocalStorage("weds360#vendorOnEdit");
    this.activatedRoute.params.subscribe((params) => {
      this.editingMode = params["actionType"];
      this.service.type = "DRESS"
      this.dress.image = "assets/images/defaults/wedding/cover-photo.png"
      if (this.editingMode == "update") {
        this.initDressView();
      }
    });
  }

  async ngOnInit() {
    let tempLookup = await this.getLookups();
    this.loadScripts();
    this.documentSelectors();
    this.loadResources();
  }

  initDressView() {
    this.service = this.storage.getLocalStorage("weds360#vendorServiceOnEdit");
    this.dress = this.service.attributes;
  };

  async getLookups() {
    this.categories = this.storage.getLocalStorage("weds360#categories");
    this.tagsAr = this.storage.getLocalStorage("weds360#tagsAr");
    this.tagsEn = this.storage.getLocalStorage("weds360#tagsEn");
  };

  createNewEntity() {

    this.service.attributes = this.dress;

    let createURL = `${urls.CREATE_VENDOR_SERVICE}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`;
    this.http.Post(createURL, {}, { "service": this.service }).subscribe((response: responseModel) => {
      if (!response.error) {

        this.toastr.success("Service has been saved succesfully", "service has been updated, Bingo!");
        this.router.navigateByUrl(`/profile/${this.lang}/vendor/my-services`);
      } else {

        this.toastr.error("Our bad sorry!", "Ooh Sorry, your service couldn't created on the server!");
      }
    });
  };

  updateExistingEntity() {

    this.service.attributes = this.dress;

    let updateURL = `${urls.UPDATE_VENDOR_SERVICE}/${constants.APP_IDENTITY_FOR_ADMINS}/${this.currentUserEmail}`;
    this.http.Post(updateURL, {}, { "service": this.service }).subscribe((response: responseModel) => {
      if (!response.error) {

        this.toastr.success("Service has been saved succesfully", "A new service has been created.");
        this.router.navigateByUrl(`/profile/${this.lang}/vendor/my-services`);
      } else {

        this.toastr.error("Our bad sorry!", "Ooh Sorry, your service couldn't created on the server!");
      }
    });
  };

  uploadImage(e: any): void {
    this.ngxSpinner.show();
    const formData = new FormData();
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      formData.append("image", imageFile);
      formData.append("targetEntity", constants.S3_CONTAINERS["VENDOR_SERVICES"]);
      formData.append("isSlefAssigned", "true");
      formData.append("targetUserEmail", this.currentUserEmail);

      let uploadImageURL = `${urls.UPLOAD_IMAGE}/${constants.APP_IDENTITY_FOR_USERS}`;
      this.http.Post(uploadImageURL, {}, formData).subscribe((response: responseModel) => {
        if (!response.error) {
          this.ngxSpinner.hide();
          this.dress.image = response.data;
        } else {

        }
      });
    }
  };


  documentSelectors() {
    $("#tagsAr").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsAr");

      e.data.angularThis.service.arTags = $("#tagsAr").chosen().val();
    });

    $("#tagsEn").change({ angularThis: this.that }, function (e, params) {
      var suggestedBudgetElement: any = document.getElementById("tagsEn");

      e.data.angularThis.service.enTags = $("#tagsEn").chosen().val();
    });

    $("#categories").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.dress.category = $("#categories").chosen().val();
    });

    $("#dressCut").change({ angularThis: this.that }, function (e, params) {
      e.data.angularThis.dress.dressCut = $("#dressCut").chosen().val();
    });
  };

  enTagsContainsTag(tagId) {
    return this.service.enTags.some(entry => entry === tagId);
  }

  arTagsContainsTag(tagId) {
    return this.service.arTags.some(entry => entry === tagId);
  }

  backToRoute() {
    this.router.navigateByUrl(`/profile/${this.lang}/vendor/my-services`);
  };

  //#region load scripts
  async ngAfterViewInit() {
    let tempLookup = await this.getLookups();
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
  }
  //#endregion
  async loadResources() {
    let lang =
      window.location.href.toString().toLowerCase().indexOf("ar") > -1
        ? "ar"
        : "en";

    let resourceLang =
      lang == null || lang == undefined ? environment.defaultLang : lang;
    this.lang = resourceLang;
    let resData = (await this.resources.load(
      resourceLang,
      constants.VIEWS["SERVICES"]
    )) as any;
    this.labels = resData.res;
  }

}
