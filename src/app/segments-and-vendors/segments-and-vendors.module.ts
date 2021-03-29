import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentsAndVendorsRoutingModule } from './segments-and-vendors-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NGX_SPINNER , COMPONENTS , THEME_MODULE} from './segments-and-vendors.imports';

@NgModule({
  declarations: [
    COMPONENTS.VendorComponent,
    COMPONENTS.SegmentComponent,
    COMPONENTS.SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    SegmentsAndVendorsRoutingModule,
    THEME_MODULE
  ]
})
export class SegmentsAndVendorsModule { }
