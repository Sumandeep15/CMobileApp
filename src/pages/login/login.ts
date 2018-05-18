import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage, LandingPage, HomePage, MenuPage } from '../pages';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  menu1hide: true;
  menu2hide: false;
  modulename:"Login"
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { userName: string, password: string, uuid: string } = {
    userName: '1234567890',
    password: '1234',
    uuid: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menu: MenuController,
    private device: Device) {
    //alert("ssss")
    this.menu.enable(false, 'menu1');
      this.menu.enable(false, 'menu2');
    // alert("ssss")
  }

  // Attempt to login in through our User service
  doLogin() {
    //  alert(this.device.uuid);
    this.account.uuid = this.device.uuid;
    this.user.login(this.account).subscribe((resp: any) => {

      if (resp.status == 1) {
        this.navCtrl.setRoot(HomePage);
      }
    }, (err) => {
      this.navCtrl.push(HomePage);
      // Unable to log in

    });
  }
}
