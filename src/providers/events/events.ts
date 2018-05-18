import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Events {

  constructor(public api: Api) { }

  GetCompanyActivity(params?: any) {
  //  alert(params)
    return this.api.post('api/gurudwaraservices/GetCompanyActivity',params).share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
