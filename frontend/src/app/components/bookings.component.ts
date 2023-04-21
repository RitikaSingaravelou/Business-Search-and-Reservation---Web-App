import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  reslist = new Array();
  resmpty:boolean=true;
  constructor() { }

  ngOnInit(): void {
  
  }

  resempty()
  {
    var s = localStorage.getItem("Reservations");
    console.log("res");
    console.log(s);
        if(s!=null) 
        { this.reslist=JSON.parse(s);
           if(this.reslist.length>=1)
                return false;
            else return true;
              }
        
          return true;

  }
  removeres(removeindex)
  {
  var str = localStorage.getItem("Reservations");
    console.log(str);
    
    var a=new Array();
    if(str!=null){
    a = JSON.parse(str);
    console.log(a)
    a.splice(removeindex,1);
    console.log(a);
    localStorage.clear();
    
    localStorage.setItem("Reservations",JSON.stringify(a));
  
    alert('Reservation Cancelled!');}



  }
}
