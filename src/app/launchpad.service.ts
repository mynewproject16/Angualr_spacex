import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class LaunchpadService {

  constructor(private http: HttpClient) { }

  getCoins() {
    const uri = 'https://api.spaceXdata.com/v3/launches?limit=100';
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  getYearfilter(year){
    const uri = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year='+year;
   // debugger
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  getlaunchfilter(value){
    const uri = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+value;
    debugger
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }
  
  getlandfilter(value, launchpadval){
    const uri = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+launchpadval+'&land_success='+value;
    debugger
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

}
