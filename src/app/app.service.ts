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


  getEmployeesDetails(): Observable<any> {
    return this.http.get("http://demo8739287.mockable.io/dealshare/get-employee-details/1")
      .pipe(
        map(response => {
          return response;
        }),
        catchError((err) => {
          return observableOf(err);
        })
      );
  }

  uploadData(data): Observable<any> {
    return this.http.post( "http://demo8739287.mockable.io/dealshare/save-employee-detail", {data: data})
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
