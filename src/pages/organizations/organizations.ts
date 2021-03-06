import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import { Api, Organizations, StorageService, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the OrganizationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-organizations',
  templateUrl: 'organizations.html',

})
export class OrganizationsPage {

  currentItems: any;
  fullItems: any;
  apiURL: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Organizations: Organizations,
    public StorageService: StorageService,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public api: Api,
    public translateService: TranslateService,
    public user: User,
    public GlobalVars: GlobalVars,
    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.apiURL = api.url;
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');




    this.Organizations.list().subscribe((resp: any) => {
      setTimeout(() => {
        loadingPopup.dismiss();
      }, 500);

      if (!user.authenticated) {
        this.navCtrl.push("LoginPage");
      }
      else {
        this.fullItems = this.currentItems = resp.data;
      }
      // alert(  JSON.stringify( this.currentItems));
    }, (err) => {

    });
  }
  initializeItems(ev: any) {
    this.currentItems = this.fullItems;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems(ev);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && this.currentItems != null) {
      this.currentItems = this.currentItems.filter((item) => {

        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.strCity.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.strState.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.strCountry.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  ionViewDidLoad() {
    $(".menu1hide").show();
    $(".menu2hide").hide();
    // console.log('ionViewDidLoad ConnectionsPage');
  }
  delete(item: any) {
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
  }
  addItem(item) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader

    this.AppUserModel.OrganizationId = item.id;

    this.Organizations.linkOrganization(this.AppUserModel).subscribe((resp) => {
      if (resp) {
        setTimeout(() => {
          loadingPopup.dismiss();
        }, 500);
        this.currentItems.splice(this.currentItems.indexOf(item), 1);
        let alert1 = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Joined Successfully.',
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

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.currentItems.delete(item);

  }
  viewCompany(item) {
    this.GlobalVars.setMyGlobalVar(item);
    this.navCtrl.setRoot("OrganizationDetailPage", { 'record': item })
  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.currentItemsnavCtrl.push('OrganizationDetailPage', {
      item: item
    });
  }

}
