import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Services {

  constructor(public api: Api) { }

  GetCompanyServices(params?: any) {
  //  alert(params)
    return this.api.post('api/gurudwaraservices/GetCompanyServices',params).share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
