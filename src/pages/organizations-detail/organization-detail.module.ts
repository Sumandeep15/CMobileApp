import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { OrganizationDetailPage } from './organization-detail';

@NgModule({
  declarations: [
    OrganizationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganizationDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    OrganizationDetailPage
  ]
})
export class OrganizationDetailModule { }
