import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';

import { LoaderService } from './loader.service';

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    private svcLoader: LoaderService
  ) { }

  get(url: string, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.get(url, params)
    //.delay(5000)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
        this.onStop();
      })
      .finally(() => {
        this.onStop();
      });
  }

  post(url: string, body: any, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.post(url, body, params)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
      })
      .finally(() => {
        this.onStop();
      });
  }

  delete(url: string, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.delete(url, params)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
      })
      .finally(() => {
        this.onStop();
      });
  }

  put(url: string, body: any, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.put(url, body, params)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
      })
      .finally(() => {
        this.onStop();
      });
  }

  patch(url: string, body: any, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.patch(url, body, params)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
      })
      .finally(() => {
        this.onStop();
      });
  }

  request(url: string, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.request(url, params)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
      })
      .finally(() => {
        this.onStop();
      });
  }

  head(url: string, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.head(url, params)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
      })
      .finally(() => {
        this.onStop();
      });
  }

  options(url: string, params?: RequestOptionsArgs): Observable<any> {

    this.onStart();

    return this.http.options(url, params)
      .catch(this.callbackException)
      .map((response: Response) =>
        <any>response.json())
      .do((res: Response) => {

      }, (error: any) => {
        this.callbackError(error);
      })
      .finally(() => {
        this.onStop();
      });
  }

  private callbackException(): Observable<any> {
    return;
  }

  private callbackError(error: any): void {
    console.log(error);
    return;
  }

  private onStop() {
    this.svcLoader.hide();
  }

  private onStart() {
    this.svcLoader.show();
  }
}
