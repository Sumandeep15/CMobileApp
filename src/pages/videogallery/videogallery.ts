import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Gallery, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController ,AlertController} from 'ionic-angular';
import * as $ from 'jquery';
/**
 * Generated class for the OrganizationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-Gallery',
  templateUrl: 'videogallery.html',
})
export class VideogalleryPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  id: any;
  constructor(public currentItemsnavCtrl: NavController, public GlobalVars: GlobalVars, public navParams: NavParams,
    public Gallery: Gallery,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,

    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {


    this.AppUserModel.OrganizationId = this.GlobalVars.getMyGlobalVar().id;
    if (!user.authenticated) {
      this.navCtrl.push("LoginPage");
    }
    else {
      let loadingPopup = this.loadingCtrl.create({
        content: 'Processing...'
      });
      loadingPopup.present();//Loader
      this.Gallery.GetCompanyVideoGallery(this.AppUserModel).subscribe((resp: any) => {
        setTimeout(() => {
          loadingPopup.dismiss();
        }, 500);

        this.currentItems = resp.data;
        alert(JSON.stringify(this.currentItems));
        console.log(JSON.stringify(this.currentItems));

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
    console.log('ionViewDidLoad OrganizationsPage');
    
  }

  viewDetail(item) {
    this.navCtrl.push("EventsDetailPage", { 'record': item })
  }


}
