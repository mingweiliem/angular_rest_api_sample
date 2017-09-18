import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const endPoint = 'https://serv.iscanpro.com/isp_demo/api/costcenters/';
const user = 'isp_demo';
const password = 'isp_demo_000';
let headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(user + ':' + password));
const requestOptions = new RequestOptions({ headers: headers });

@Injectable()
export class HttpService {

  constructor(private http: Http) {}

  getData() {
    return this.http.get(endPoint, requestOptions);
  }

  save(data) {
    return this.http.put(endPoint + data.refNr, data, requestOptions);
  }

  delete(refNr) {
    return this.http.delete(endPoint + refNr, requestOptions);
  }
}
