import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {timeoutWith} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    public url: string;
    public status: string;

    constructor(
        public http: HttpClient
    ) {
      this.url = environment.url + environment.api;
    }

  getHeaders(): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return {headers};
  }

  checkemail(content: any): Observable<any> {
    const theUrl = this.url + 'checkemail';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  validateemailandcode(content: any): Observable<any> {
    const theUrl = this.url + 'validateemailandcode';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  getproveedorinfo(content: any): Observable<any> {
    const theUrl = this.url + 'getproveedorinfo';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  registerproveedor(content: any): Observable<any> {
    const theUrl = this.url + 'registerproveedor';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  updateproveedor(content: any): Observable<any> {
    const theUrl = this.url + 'updateproveedor';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  checkproveedordata(content: any): Observable<any> {
    const theUrl = this.url + 'checkproveedordata';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  getmaterialespublicados(content: any): Observable<any> {
    const theUrl = this.url + 'getmaterialespublicados';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  savemyproposal(content: any): Observable<any> {
    const theUrl = this.url + 'savemyproposal';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

  sendmyproposal(content: any): Observable<any> {
    const theUrl = this.url + 'sendmyproposal';
    return this.http.post(theUrl, content, this.getHeaders()).pipe(
        timeoutWith(5000, throwError(new Error('Connection error')))
    );
  }

}
