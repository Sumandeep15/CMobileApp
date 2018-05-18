import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import {
  Services, GlobalVars
} from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {
    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Service: Services,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController,
    public GlobalVars: GlobalVars,
    private device: Device,
    private alertCtrl: AlertController) {
    //   this.AppUserModel.OrganizationId = this.navParams.get('id');
    this.AppUserModel.OrganizationId = this.GlobalVars.getMyGlobalVar().id;
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader
    this.Service.GetCompanyServices(this.AppUserModel).subscribe((resp: any) => {
      this.currentItems = resp.data;

      setTimeout(() => {
        loadingPopup.dismiss();
      }, 100);
      //   alert("aa")
      // alert(this.currentItems.length)
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

}
