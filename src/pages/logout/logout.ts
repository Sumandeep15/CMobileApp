import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage ,LandingPage,HomePage} from '../pages';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'logout-login',
  templateUrl: 'logout.html'
})
export class LogoutPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type


  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,

    private device: Device) {
       this.user.logout()

        this.navCtrl.setRoot("LoginPage");


  }


}
