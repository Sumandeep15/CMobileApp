import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import { Items } from '../../providers/providers';
import { MenuController } from 'ionic-angular';
import { Organizations, StorageService, User,GlobalVars } from '../../providers/providers';
@IonicPage()
@Component({
  selector: 'page-organization-detail',
  templateUrl: 'organization-detail.html'
})
export class OrganizationDetailPage {
  // item: any;
  currentItem: any;

   AppUserModel: {aboutUs:any,
  contactUs:any } = {

    aboutUs: "-",
    contactUs:"-"
  };
  constructor(public navCtrl: NavController, public GlobalVars: GlobalVars, public navParams: NavParams, public menu: MenuController, public Organizations: Organizations) {
    this.currentItem = this.GlobalVars.getMyGlobalVar();

    // alert(JSON.stringify(this.AppUserModel))
    // this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {

    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
    this.Organizations.Organizationdetail(this.currentItem.id).subscribe((resp: any) => {
      this.AppUserModel = resp.data;

    }, (err) => {

    });
  }
  ionViewDidLoad() {

    // console.log('ionViewDidLoad ConnectionsPage');
  }
}
