import { constants, resources } from 'src/app/core';
import { Component, ElementRef, Inject, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'weds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() authorizedUser: boolean = false;
  @Input() urlSegment = ''
  @Input() type = ''

  isLogined = false;
  menuItems = [];
  profileLinks = [];
  lang: any;

  // Languge!
  loginURL: string;
  langChangerURL: string;
  labels: any = {};


  constructor(private actictedRoute: ActivatedRoute, private resources: resources,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef,
    private router: Router) { }

  ngOnInit() {
    let currentUserEnc = window.localStorage.getItem("weds360#role");
    let currentUser = atob(currentUserEnc);

    this.loadResources(currentUser);
    this.checkViewAuthority();
    this.loginURL = `/security/${this.lang}/login`;
  }

  /** Use this function at each view to load corrosponding resources! */
  async loadResources(currentUserType) {
    let providedlang: any = this.actictedRoute.parent.params;
    let lang = providedlang._value["lang"];
    let resourceLang = this.lang = ((lang == null) || (lang == undefined)) ? environment.defaultLang : lang;
    this.lang = resourceLang;
    let dashboardNavs = `${currentUserType.toUpperCase()}_DASHBOARD`;
    let resData = await this.resources.load(resourceLang, constants.VIEWS[dashboardNavs]) as any;
    this.menuItems = this.menuItems.concat(resData.res["menu"]);
    if (this.lang === 'ar') this.menuItems.reverse()
    this.profileLinks = this.profileLinks.concat(resData.res["actions"]);
    let translatedRes = await this.resources.load(this.lang, constants.VIEWS["HOME_LAYOUT"]) as any;;
    this.labels = translatedRes.res
  };

  checkViewAuthority() {
    this.isLogined = this.authorizedUser;
  };

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js', 'assets/scripts/changeLang.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
  changeLanguge() {
    const baseUrl = window.location.href.toString().toLowerCase();
    const isArabic = this.lang === 'ar';
    const url = isArabic ? baseUrl.replace('/ar/', '/en/') : baseUrl.replace('/en/', '/ar/')
    window.location.href = url
  }
}
