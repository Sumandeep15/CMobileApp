import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';
import { StorageService } from '../storage/storageservice';
@Injectable()
export class Organizations {

  constructor(public api: Api, private cacheService: StorageService) { }

 list() {
    // this.cacheService.get();
  //  alert(params.id)
    return this.api.get('api/gurudwaraservices/getAllOrganizationsByCId').share();
  }
  Organizationdetail(id)
  {

    return this.api.get('api/gurudwaraservices/Organizationdetail?id='+id).share();
  }
  linkOrganization(AppUserModel:any) {
 //alert(AppUserModel)
    return this.api.post('api/gurudwaraservices/linkOrganization',AppUserModel).share();
  }

  listbyId() {
  //  alert(params.id)
    return this.api.get('api/gurudwaraservices/getOrganizationsByCId').share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
