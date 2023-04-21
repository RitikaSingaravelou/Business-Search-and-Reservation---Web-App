import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { HttpClient } from  '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter,startWith ,map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SearchresService {

  //constructor() { }
  
  constructor(private http: HttpClient) { }

 getsearchres() {
    let url="/api/searchresults?keyword=Donuts&latitude=34.05349&longitude=-118.24532&categories=food&distance=5";
    console.log(url);
    
    return this.http.get(url);
  }

  getspecificbiz(id) {
    let url="/api/businesssummary?id="+String(id);
    console.log(url);
    return this.http.get(url);
  }
  opts = [];
  getautocosugg(keyw) {
    let url="/api/autocomplete?keyword="+String(keyw);
    console.log(url);
    
    return this.http.get(url);
  }
  getspecificbizreviews(id) {
    let url="/api/reviews?id="+String(id);
    console.log(url);
    return this.http.get(url);
  }



getautocompsugg(keyw) {
  return this.opts.length ? of (this.opts) :
    this.http.get<any>("/api/autocomplete?keyword="+String(keyw)).pipe(tap(data => this.opts = data.terms))
}
  /*showtodaydate()
  {
    return "nov5";*/
  
  public formsrch(searchdata,lat,longi) {  
    console.log(searchdata);
    console.log("key : " + searchdata.ac);  
    console.log("dist : " + searchdata.Distance);  
    
    console.log("category: " + searchdata.Category);  
    console.log("loc : " + searchdata.Location); 
    console.log("lat:"+lat);
    console.log("longi:"+longi);
    let url="/api/searchresults?keyword="+String(searchdata.ac)+"&latitude="+String(lat)+"&longitude="+String(longi)+"&categories="+String(searchdata.Category)+"&distance="+String(searchdata.Distance);
    console.log(url);
    
    return this.http.get(url);
    //return this.getsearchres();
 }  

 public getsummary(bid) {  
  return this.getspecificbiz(bid);
}  

 
}



