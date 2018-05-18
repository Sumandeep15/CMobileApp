import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Events } from '../../providers/providers';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the EventsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})

export class ScheduleDetailPage {
  currentItem: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.AppUserModel = this.navParams.get('record');
    // this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {
    this.currentItem = this.AppUserModel;
    console.log(this.currentItem);
    //  }, (err) => {

    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsDetailPage');
  }

}
