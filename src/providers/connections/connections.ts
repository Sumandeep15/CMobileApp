import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Connections {

  constructor(public api: Api) { }

 GetConnections() {

    return this.api.get('api/gurudwaraservices/GetConnections').share();
  }
  linkOrganization(AppUserModel:any) {
 //alert(AppUserModel)
    return this.api.post('api/gurudwaraservices/linkOrganization',AppUserModel).share();
  }
  unlinkOrganization(AppUserModel:any) {
 //alert(AppUserModel)
    return this.api.post('api/gurudwaraservices/unlinkOrganization',AppUserModel).share();
  }

  listbyId() {
  //  alert(params.id)
    return this.api.get('api/gurudwaraservices/getConnectionsByCId').share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
