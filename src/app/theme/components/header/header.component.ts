import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'weds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogined = false;

  constructor() { }

  ngOnInit() {
  }

}
