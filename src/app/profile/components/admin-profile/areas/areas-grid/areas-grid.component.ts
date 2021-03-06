import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { responseModel } from './../../../../../core/models/response';
import { urls } from './../../../../../core/helpers/urls/urls';
import { httpService } from '../../../../../core/services/http/http';
import { constants, resources,area,localStorageService } from 'src/app/core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-areas-grid',
  templateUrl: './areas-grid.component.html',
  styleUrls: ['./areas-grid.component.scss']
})
export class AreasGridComponent implements OnInit, AfterViewInit {

  startTypingAnimation: boolean = true;

  areasList : area[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,private ngxSpinner: NgxSpinnerService,
    private storage: localStorageService,
    private elementRef: ElementRef, private resources: resources,
    private http: httpService,private toastr: ToastrService,
    private actictedRoute: ActivatedRoute) {
    this.loadResources();
    this.storage.eraseLocalStorage("weds360#areaOnEdit");
  }

  ngOnInit() {
    this.getAllAreas();
  }

  async loadResources() {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;

    let resData = await this.resources.load(resourceLang, constants.VIEWS["HOME_LAYOUT"]);
  };

  getAllAreas() {
    let getAllAreasURL = `${urls.GET_ALL_AREAS}/${constants.APP_IDENTITY_FOR_USERS}`;
    console.log(getAllAreasURL)

    this.http.Get(getAllAreasURL, {}).subscribe((response: responseModel) => {
      if (!response.error) {
        console.log(response)
        this.areasList = response.data;
      } else {
        console.log("error")
        console.log(response.error);
      }
    });

  };


  pageChange(pageNumber: any) {

  };

  editEntity(id: any){
    this.router.navigate([`profile/en/admin/areas-action/update`]);
    let targetTheme = this.areasList.find(x => x._id == id);
    this.storage.setLocalStorage("weds360#areaOnEdit" , targetTheme);
  };

  deleteEntity(id: any){
    this.ngxSpinner.show();

    let deleteURL = `${urls.DELETE_AREA}/${constants.APP_IDENTITY_FOR_ADMINS}/${id}`;
    this.http.Post(deleteURL , {} , { }).subscribe((response: responseModel) => {
      if(!response.error){
        this.ngxSpinner.hide();
        this.toastr.success("Area has been deleted succesfully" , "An area has been deleted and wedding website will be impacted.");
        this.getAllAreas();
      } else {
        this.ngxSpinner.hide();
        this.toastr.error("Our bad sorry!" , "Ooh Sorry, your area couldn't deleted on the server!");
      }
    });
  };

  navigateToCreateNewArea() {
    this.router.navigate(['profile/en/admin/areas-action/new']);
  };

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
