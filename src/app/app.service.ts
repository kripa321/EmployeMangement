import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {of as observableOf} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';
import {InterceptorService} from './interceptor/interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: InterceptorService ) {
  }
  myTokenData(): Observable<any> {
    return this.http.post( "https://testapi.dnvgl.com/dcm_uat/v1/auth", {username:"z_auditor_app", password:"DCM-4-uat"})
      .pipe(
        map(response => {
          return response;
        }),
        catchError((err) => {
          return observableOf(err);
        })
      );
  }

}
