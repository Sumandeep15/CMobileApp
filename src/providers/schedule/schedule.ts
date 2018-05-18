import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Schedule {

  constructor(public api: Api) { }

  GetCompanySchedule(params?: any) {
  //  alert(params)
    return this.api.post('api/gurudwaraservices/GetCompanySchedule',params).share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
