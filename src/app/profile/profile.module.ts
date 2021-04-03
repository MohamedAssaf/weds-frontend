import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { THEME_MODULE } from './../security/security.imports';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import * as COMPONENTS from './components';
import { AgmCoreModule } from '@agm/core';
import { BookmarksLovedComponent } from './components/user-profile/bookmarks-loved/bookmarks-loved.component';

@NgModule({
  declarations: [
    COMPONENTS.ProfileMainLayoutComponent,
    COMPONENTS.OverviewComponent,
    COMPONENTS.MessagesComponent,
    COMPONENTS.ChecklistComponent,
    COMPONENTS.RegistrylistComponent,
    COMPONENTS.BudgeterComponent,
    COMPONENTS.EventsComponent,
    COMPONENTS.WeddingWebsiteComponent,
    COMPONENTS.ChecklistGridComponent,
    COMPONENTS.ChecklistFormComponent,
    COMPONENTS.BudgeterGridComponent,
    COMPONENTS.BudgeterFormComponent,
    COMPONENTS.UsersGridComponent,
    COMPONENTS.UsersFormComponent,
    COMPONENTS.WeddingWebsitesGridComponent,
    COMPONENTS.ProfileDetailsComponent,
    COMPONENTS.ThemesFormComponent,
    COMPONENTS.ThemesGridComponent,
    COMPONENTS.AreasGridComponent,
    COMPONENTS.AreasFormComponent,
    COMPONENTS.CategoriesFormComponent,
    COMPONENTS.CategoriesGridComponent,
    COMPONENTS.OffersGridComponent,
    COMPONENTS.OffersFormComponent,
    COMPONENTS.TagsFormComponent,
    COMPONENTS.TagsGridComponent,
    COMPONENTS.WeddingDetailsComponent,
    COMPONENTS.BookmarksLovedComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    THEME_MODULE,
    NgxSpinnerModule,
    NgxDropzoneModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnZPhwhppJByAoyUEzJtF31F0TalEoiYA',
      libraries: ['places']
    })
  ],
  providers:[
    NgxSpinnerService,
  ]
})
export class ProfileModule { }
