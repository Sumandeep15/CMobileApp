import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderProvider {

  constructor(public http: Http, public loadingCtrl: LoadingController) {

  }

  loading: any = this.loadingCtrl.create({
    content: "Please wait..."
  })

  show() {
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }


}
