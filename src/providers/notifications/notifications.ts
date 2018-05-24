import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Notifications {

  constructor(public api: Api) { }

  GetCompanyNotifications(params?: any) {
  //  alert(params)
    return this.api.post('api/gurudwaraservices/GetCompanyNotifications',params).share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
