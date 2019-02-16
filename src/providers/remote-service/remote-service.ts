import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

    //https://openexchangerates.org/api/historical/2017-01-19.json?app_id=58f2bf08c96246f2a6efdac01032a446

    constructor(public http: HttpClient) {
        console.log('Hello RemoteServiceProvider Provider');
    }

    getConversionRateAsPerDate(date: string) {
        //let getApiUrl = "http://api.fixer.io/" + date + "?base=USD&symbols=USD,MXN";
        let getApiUrl = "https://openexchangerates.org/api/historical/" + date + ".json?app_id=58f2bf08c96246f2a6efdac01032a446";
        return  this.http.get(getApiUrl)
            //.do((res : Response ) => console.log(res.json()))
            //.map((res : Response ) => res.json())
            .catch(error => Observable.throw(error));
    }
}
