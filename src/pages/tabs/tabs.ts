import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = "OrganizationDetailPage";
  tab2Root: any = "EventsPage";
  tab3Root: any = "SchedulePage";
  tab4Root: any = "ServicesPage";
  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = "Home";
      this.tab2Title = "Events";
      this.tab3Title = "Schedule";
      this.tab4Title = "Services";
    });
  }
}
