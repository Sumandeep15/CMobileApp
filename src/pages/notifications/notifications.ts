import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { Notifications, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-Notifications',
  templateUrl: 'Notifications.html',
})
export class NotificationsPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {
    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Notifications: Notifications,
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
      this.Notifications.GetCompanyNotifications(this.AppUserModel).subscribe((resp: any) => {

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
    console.log('ionViewDidLoad NotificationsPage');
  }
  viewDetail(item) {
    this.navCtrl.push("NotificationsDetailPage", { 'record': item })
  }
}
