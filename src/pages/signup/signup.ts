import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController ,MenuController,LoadingController} from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { User } from '../../providers/providers';
import { Device } from '@ionic-native/device';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',

})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  SignUp: any;
  OTPSignUp: any;
  account: { Name: string, Email: string, Mobile: number, UUID: string, OTP: string } = {
    Name: '',
    Email: '',
    Mobile: null,
    UUID: '',
    OTP: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public device: Device,
    private sms: SMS,
    public menu:MenuController,
      private loadingCtrl: LoadingController,) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
      this.OTPSignUp = false;
      this.SignUp = true;
      this.menu.enable(false, 'menu1');
      this.menu.enable(false, 'menu2');
    })
  }

  doSignup() {
    //alert(this.device.uuid);
    this.account.UUID = this.device.uuid;
    //this.sms.send('9041423335', 'Hello world!');
    // Attempt to login in through our User service
     let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader
    this.user.signup(this.account).subscribe((resp: any) => {
       setTimeout(() => {
        loadingPopup.dismiss();
      }, 100);
      if (resp.status == 1) {
        this.OTPSignUp = true;
        this.SignUp = false;
        let toast = this.toastCtrl.create({
          message: "Please check the OTP sent on your email address.",
          duration: 3000,
          position: 'top'
        });
         toast.present();
      }
      else if (resp.status == 2) {
        let toast = this.toastCtrl.create({
          message: "Already exists.",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {


      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  OTPSignup() {
    // this.account.UUID = this.device.uuid;
    // Attempt to login in through our User service
    this.user.OTPsignup(this.account).subscribe((resp: any) => {
      if (resp) {
        if (resp.status == 1) {
          this.navCtrl.push("LoginPage");
        }
        else if (resp.status==-1)
        {
            let toast = this.toastCtrl.create({
          message: "Please entered a valid OTP.",
          duration: 3000,
          position: 'top'
        });
         toast.present();
        }
      }
    }, (err) => {

      this.navCtrl.push("LoginPage");
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
