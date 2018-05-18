import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { Connections, User ,GlobalVars} from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { EventsPage, SchedulePage } from '../pages';
import { MenuController, LoadingController,AlertController } from 'ionic-angular';

/**
/**
 * Generated class for the ConnectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Connections: Connections,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    public GlobalVars:GlobalVars,
    private alertCtrl: AlertController) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');
    this.Connections.GetConnections().subscribe((resp: any) => {
      setTimeout(() => {
        loadingPopup.dismiss();
      }, 500);
      if (!user.authenticated) {
        this.navCtrl.push("LoginPage");
      }
      else {
        // alert("hnji")
        //$("#settingsTable").append();
        this.currentItems = resp.data;
      }
      //alert(  JSON.stringify( this.currentItems));
    }, (err) => {

    });
  }
delete(item: any) {
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
  }
  ionViewDidLoad() {

    // console.log('ionViewDidLoad ConnectionsPage');
  }

  viewEvents(id) {
    this.navCtrl.push(EventsPage, { 'id': id })
  }
  viewSchedule(id) {
    this.navCtrl.push(SchedulePage, { 'id': id })
  }


  removeItem(item) {

    this.AppUserModel.OrganizationId = item.id;
    //alert(this.device.uuid);
    // this.account.UUID = this.device.uuid;
    // Attempt to login in through our User service
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader
    this.Connections.unlinkOrganization(this.AppUserModel).subscribe((resp) => {
      if (resp) {
        setTimeout(() => {
          loadingPopup.dismiss();
        }, 500);
       this.currentItems.splice(this.currentItems.indexOf(item), 1);

      let alert1 = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Removed Successfully.',
          buttons: ['OK']
        });
        alert1.present();
      }
    }, (err) => {

      this.navCtrl.push("LoginPage");

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: "error",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
 viewCompany(item) {
  this.GlobalVars.setMyGlobalVar(item);
    this.navCtrl.setRoot("OrganizationDetailPage", { 'record': item })
  }
}
