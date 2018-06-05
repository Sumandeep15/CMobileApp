

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storageservice';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string =  'http://8.38.88.31:85';//"http://8.38.88.31:85";//http://localhost:22222/
//'http://localhost:2069/';//
  constructor(public http: HttpClient, private storage: StorageService) {
  }
  // createAuthorizationHeader(headers: HttpHeaders) {
  //   let currentUser = this.storage.get("guser");
  //   console.log(currentUser);
  //   //alert(btoa(JSON.stringify(currentUser['user'])));
  //   //  headers = headers .append('token', 'Amrik Singh');
  //   headers = headers.append('token', 'sdsddsdssd');
  //  // headers = headers.append('Authorization', 'Bearer ' + currentUser['access_token']);
  //   console.log(headers);
  //   return headers;
  // }


  createAuthorizationHeader(headers: HttpHeaders) {
    let currentUser = this.storage.get("guser");
    console.log(currentUser);

    headers = headers.append('token', btoa(JSON.stringify(currentUser['user'])));
    headers = headers.append('Authorization', 'Bearer ' + currentUser['access_token']);
    return headers;
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }

    }
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    reqOpts.headers = headers;

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
  postsignup(endpoint: string, body: any, reqOpts?: any) {

    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }
  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = { headers: {} };
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    reqOpts.headers = headers;
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    //  reqOpts.headers = headers;
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    // reqOpts.headers = headers;
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
