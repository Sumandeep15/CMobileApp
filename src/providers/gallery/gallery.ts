import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Gallery {

  constructor(public api: Api) { }

  GetCompanyGallery(params?: any) {
  //  alert(params)
    return this.api.post('api/gurudwaraservices/GetCompanyGallery',params).share();
  }
 GetCompanyVideoGallery(params?: any) {
  //  alert(params)
    return this.api.post('api/gurudwaraservices/GetCompanyVideoGallery',params).share();
  }
  add(item: Item) {
  }

  delete(item: Item) {
  }

}
