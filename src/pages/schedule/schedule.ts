import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { Schedule, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {
    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Schedule: Schedule,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    public GlobalVars: GlobalVars,
    private device: Device, public menu: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    if (!user.authenticated) {
      this.navCtrl.push("LoginPage");
    }
    else {
      this.AppUserModel.OrganizationId = this.GlobalVars.getMyGlobalVar().id;
      let loadingPopup = this.loadingCtrl.create({
        content: 'Processing...'
      });
      loadingPopup.present();//Loader
      this.Schedule.GetCompanySchedule(this.AppUserModel).subscribe((resp: any) => {

        this.currentItems = resp.data;
        setTimeout(() => {
          loadingPopup.dismiss();
        }, 500);
        if (this.currentItems == null || this.currentItems.length < 1) {
          let alert1 = this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Record not found.',
            buttons: ['OK']
          });
          alert1.present();
        }
      }, (err) => {

      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }
  viewDetail(item) {
    this.navCtrl.push("ScheduleDetailPage", { 'record': item })
  }
}
