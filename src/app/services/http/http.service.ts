import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpSentEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  userAuthenticationDetails: any = null;
  options: any;
  roles: any = null;
  userdetails: any = null;
  constructor(private http: HttpClient) { }
  getToken() {
    return this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("currentToken") as string),
      })
    };
  }
  public callPostServiceForLogin(url: any, param: any): Observable<HttpEvent<any>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(url, JSON.stringify(param), { headers: httpHeaders });
  }
  public callPostService(url: any, param: any): Observable<HttpEvent<any>> {
    return this.http.post<any>(url, param);
  }
  public callGetService(url: any): Observable<HttpEvent<any>> {
    return this.http.get<any>(url);
  }
  public getRequest(url: string,data: HttpParams): Observable<any> {
    return  data != null ? this.http.get(url,{ params: data }):this.http.get(url);
  }
  public callPutService(url: any, param: any): Observable<HttpEvent<any>> {
    return this.http.put<any>(url, JSON.stringify(param), this.getToken());
  }
  public callDeleteService(url: any): Observable<HttpEvent<any>> {
    return this.http.delete<any>(url, this.getToken());
  }
  public submitFormService(url: any, FormData: any): Observable<HttpEvent<any>> {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("currentToken") as string),
    });
    return this.http.post<any>(url, FormData, { headers: httpHeaders });
  }
}
