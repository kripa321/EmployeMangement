/**
 *  Copyright (C) by <BHM>,  April 2019
 *  interceptors have been used to pre-process and post-process the HTTP request before
 *  sending and after getting response from the server.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable()
export class InterceptorService {

  constructor(private http: HttpClient, public router: Router) {
  }

  /**
   * Get method for get type api
   * @param url
   * @returns {Observable<Response>}
   */
  get(url) {
    return this.http.get(url);
  }

  /**
   * Post method for post type api
   * @param url
   * @param data
   * @returns {Observable<Response>}
   */
  post(url, data) {
    let  body = 'username=z_auditor_app&password=DCM-4-uat';
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };
    return this.http.post(url,body,httpOptions);
  }


}
