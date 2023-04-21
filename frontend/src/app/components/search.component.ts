import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { SearchresService } from '../../services/searchres.service';
import {ChangeDetectorRef} from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter,startWith ,map} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

//import { YelpsearchformComponent } from '../yelpsearchform/yelpsearchform.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  public mapOptions: google.maps.MapOptions;
  public marker: any;
  frmYelpSearch: FormGroup;  
  public col:any;
  display='none';
  isDisabled:boolean=false;
  displayd11='block';
  displayd12='block';
  displayd2='block';
  autoloc:boolean=false;
  formval:boolean=false;
  rForm: FormGroup;  
  rrform:FormGroup;
  submitted = false;
  formSubmitAttempt=false;
  default: 'Default';
  selectedop: any;
  count=1;
  today:any;
  result:any; 
  public latitude:any;
  public longitude:any;
  filteredOptions: any;
  ac:FormControl
  TimeH:FormControl
  TimeM:FormControl
  filteredop: any;
  p1:any;
  p2:any;
  p3:any;
  i1:boolean=false;
  i2:boolean=false;
  i3:boolean=false;
  isLoading = false;
  errorMsg!: string;
  div11:boolean=false;
  div12:boolean=false;
  div2:boolean=false;
  div3:boolean=false;
  valid:boolean=false;
  public bizres:any;
  public reviews:any;
  public bizlat:any;
  public bizlong:any;
  public specificbiz:any;
  public yelpurl: any;
  public address: any;
  public pricerange: any;
  public category: any;
  public phone: any;
  public status: any;
  public twittxt:any;
  public bname:any;
  resultip:any;
  sta:boolean=false;
  price:boolean=false;
  addr:boolean=false;
  ylink:boolean=false;
  cat:boolean=false;
  phn:boolean=false;
  revtab:boolean=false;
  hideH:boolean=false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  hideM:boolean=false;
  emailempty:boolean=true;
  emailval:boolean=false;
  dateempty:boolean=true;
  timeempty:boolean=true;
  rformshow:boolean=false;
  arr = new Array();
  res=new Array();
    constructor(private _fb: FormBuilder, public searchservice: SearchresService,private http: HttpClient, private cd: ChangeDetectorRef) {
      
      }
    
      
    

    ngOnInit(): void {  
      this.frmYelpSearch = this._fb.group({  
          ac:"",
          Distance: ['10', Validators.required],
          Category:"All",
          Location:"",
          Autolocation: false

      }); 
    
    

      this.ac = new FormControl();

      this.ac.valueChanges
      .pipe(
        filter(res => {
          return res !== null 
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredop = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get('/api/autocomplete?keyword=' + value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data == undefined) {
          this.errorMsg = data['Error'];
          this.filteredop = [];
        } else {
          this.errorMsg = "";
          console.log(data);
          let arr: any[] = [];
          for(var t of data.terms)
            arr.push(t.text)
          for(var c of data.categories)
            arr.push(c.title)
          console.log(arr)
          this.filteredop = arr;

        }
        console.log(this.filteredop);
      });
    
    

      this.rForm = this._fb.group({  
         
        regEmail: ""  ,
        date:"",
        TimeH:"",
        TimeM:""
    });  
    this.rrform = this._fb.group({
      
      officialEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
  }); 
    } 

    openModal(){
      this.display='block';
      /*this.rrForm = this._fb.group({
        
        email: ['', [Validators.required, Validators.email]],
        date: ['', Validators.required],
        TimeH: "",
        TimeM:""
      });*/
   }

   onCloseHandled(){
    this.display='none';
 }

 rrf = new FormGroup({
	email: new FormControl('',[
  	Validators.required,
  	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    date: new FormControl('',[
      Validators.required]),
      TimeH: new FormControl('',[
        Validators.required]),
        TimeM: new FormControl('',[
          Validators.required])
  });

  get pmail(){
    return this.rrf.get('email')
    }
  get dp(){
      return this.rrf.get('date')
      }

      get th(){
        return this.rrf.get('TimeH')
        }
        get tm(){
          return this.rrf.get('TimeM')
          }
leavegroup()
{
  this.div2=false;
  this.div11=true;
  this.div12=false;
  this.displayd11='block';this.displayd12='none';this.displayd2='none';
}
onsubmit(rdata)
{
  this.formSubmitAttempt=true;
 
  if(rdata.email!=""&&rdata.date!=""&&rdata.TimeM!=""&&rdata.TimeH!="")
      {console.table(rdata);
        var st = localStorage.getItem("Reservations");
        if(st!=null)
        {var olda=new Array();
          olda = JSON.parse(st);
          this.arr=olda;
        }

       
        this.arr.push(
          { 
            BusinessName:this.bname,
            Date:String(rdata.date),
            Time:String(rdata.TimeH)+":"+String(rdata.TimeM),
            Email:String(rdata.email)
          }
        );
        
        
         
        localStorage.setItem("Reservations",JSON.stringify(this.arr));
        
        alert('Reservation Created!');
        
        this.onCloseHandled();

        //$('#resmodal').modal('hide')
      }
  
  
}





checkres()
{ var b=this.bname;
  console.log(this.bname);
  var str = localStorage.getItem("Reservations");
    console.log(str);
    if(str===null) return false;
    var a=new Array();
    a = JSON.parse(str);
    console.log(a)
    for(let i = 0; i < a.length; i++)
    { console.log(a[i].BusinessName);
      
     if(a[i].BusinessName===b) {console.log(true);return true;}}
      console.log(false);
     return false;


}

cancelres()
{var b=this.bname;
  var str = localStorage.getItem("Reservations");
    console.log(str);
    
    var a=new Array();
    var removeindex=-1;
    if(str!=null){
    a = JSON.parse(str);
    console.log(a)
    for(let i = 0; i < a.length; i++)
    { console.log(a[i].BusinessName);
      
     if(a[i].BusinessName===b) {removeindex=i;console.log(removeindex);break;}
      
    
    }
    if(removeindex>-1){
    a.splice(removeindex,1);
    console.log(a);
    localStorage.clear();
    
    localStorage.setItem("Reservations",JSON.stringify(a));
  
    alert('Reservation Cancelled!');}


}
}
 onSubmitvalid(fdata)
 {
  alert('Form Submitted succesfully!!!\n Check the values in browser console.');
 this.valid=false;}
  onSubmit(fdata) {
   this.submitted = true;
    if(fdata.regEmail!="") {
      this.emailempty=false;
    
    var regexp = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    
    
    if(regexp.test(String(fdata.regEmail).toLowerCase()))
    { 
      this.emailval=true;}
    
  }
    
    if(fdata.date!="") {this.dateempty=false;}

    if(fdata.TimeH!=""&&fdata.TimeM!=""){this.timeempty=false;}

    //console.log(this.emailval);
    
    if (this.emailempty==false&&this.emailval==true&&this.dateempty==false&&this.timeempty==false&&this.submitted) {
      //alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      this.valid=true;
      console.table(this.rForm.value);
    }
     
  }

  showform()
  {this.rformshow=true;}

    selectedOption($event:MatAutocompleteSelectedEvent)
     {let selval=$event.option.value;
      if(selval)
      {this.frmYelpSearch.controls['ac'].setValue(selval,{emitEvent:false})}
      console.log(selval);
     }
     
    
     onChangeH(event : any) {
      console.log(event.target.value);
      this.hideH = false;
    }

    onChangeM(event:any) {
      console.log(event.target.value);
      this.hideM = false;
    }
   
     public checkval(fd)
     {var keyw=fd.ac;
      //var keyw=this.frmYelpSearch.get('ac')?.value;
      var loc=this.frmYelpSearch.get('Location')?.value;
      var cate=this.frmYelpSearch.get('Category')?.value;
      var dist=this.frmYelpSearch.get('Distance')?.value;

      console.log(keyw);
      console.log(loc);
      console.log(cate);
      console.log(dist);
      console.log(this.autoloc);
    
      if (this.autoloc===true&&keyw!="")
      {console.log("valid");return true;}

      else if(loc!=""&&keyw!=""){console.log("valid");return true;}
      console.log("invalid");return false;
     }
     /*    public checkvalidity()
    {
      var keyw=this.frmYelpSearch.get('ac')?.value;
      var loc=this.frmYelpSearch.get('location')?.value;
      var keyw=this.frmYelpSearch.get('Category')?.value;
      var keyw=this.frmYelpSearch.get('Distance')?.value;
var latitude,longitude;
       
if (this.autoloc===true&&fval.keyw!="")
{
 var requesturl = 'https://ipinfo.io/?token=ecab35a1f49e70';
    var xhttpip = new XMLHttpRequest();
    xhttpip.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var latlong=xhttpip.response.loc;
        var latlongsplit=latlong.split(/[, ]+/);
        latitude= latlongsplit[0];
        longitude= latlongsplit[1];
        var requestURLb = '/searchresults?keyword='+keyw.value+'&latitude='+latitude+'&longitude='+longitude+'&categories='+category+'&distance='+dist.value;
   console.log(requestURLb) 
 
    var xhttpb = new XMLHttpRequest();
    xhttpb.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        bizsearchresults=xhttpb.response;
        console.log(bizsearchresults.businesses[0].name);
        createtable(bizsearchresults);
        //showbusinesssearchresults(bizsearchresults);
    }}

xhttpb.open('GET', requestURLb);
xhttpb.responseType = 'json';
xhttpb.send();
    }
    }
xhttpip.open('GET', requesturl);
xhttpip.responseType = 'json';
xhttpip.send();


}








    }*/

    onCheckboxChange(e) {

    
  
      if (e.target.checked) {
  
        this.autoloc=true; this.frmYelpSearch.controls['Location'].setValue(""); this.frmYelpSearch.get('Location')?.disable();
  
      } else {
        this.autoloc=false;this.frmYelpSearch.get('Location')?.enable();
      }
  
    }
    public formvali(ff) {  
      console.log("entered formvali");
      var keyw=ff.ac;
      //var keyw=this.frmYelpSearch.get('ac')?.value;
      var loc=this.frmYelpSearch.get('Location')?.value;
      var cate=this.frmYelpSearch.get('Category')?.value;
      var dist=this.frmYelpSearch.get('Distance')?.value;
     
      console.log(keyw);
      console.log(loc);
      console.log(cate);
      console.log(dist);
      console.log(this.autoloc);

      if (this.autoloc===true&&keyw!=""){

        var requesturl = 'https://ipinfo.io/?token=ecab35a1f49e70';

        console.log(requesturl);

        this.http.get(requesturl).subscribe(response => {this.resultip=response;
          var latlong=this.resultip.loc;
          var latlongsplit=latlong.split(/[, ]+/);
          this.latitude= latlongsplit[0];
          this.longitude= latlongsplit[1];

          this.searchservice.formsrch(this.frmYelpSearch.value,this.latitude,this.longitude).subscribe(response => {console.log(response);
            this.bizres = response;console.log(this.bizres.businesses);
            if(this.bizres&&this.bizres.businesses.length>=1)
               {this.div11=true;this.div12=false;
                //this.displayd11='block';this.displayd12='none';
              }
              else
               {this.div12=true;this.div11=false;
                //this.displayd11='none';this.displayd12='block';
              }
          this.div2=false;
          //this.displayd2='none';
          this.div3=false;
          });
          
        });

        
        }


      
      else if(loc!=""&&keyw!=""){
        var addr=encodeURI(loc);
        var requestURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+String(addr)+'&key=AIzaSyCK8h76HcxMdbYBvJyxrJtFXbCqAAWN0Fw';
        console.log(requestURL);

        this.http.get(requestURL).subscribe(response => {this.result=response;
          console.log(this.result);
          this.latitude=this.result.results[0].geometry.location.lat;
          this.longitude=this.result.results[0].geometry.location.lng;
          console.log(this.latitude);
                console.log(this.longitude);

                this.searchservice.formsrch(this.frmYelpSearch.value,this.latitude,this.longitude).subscribe(response => {console.log(response);
                  this.bizres = response;console.log(this.bizres.businesses);
                  if(this.bizres&&this.bizres.businesses.length>=1)
                     {this.div11=true;this.div12=false;
                      //this.displayd11='block';this.displayd12='none';
                    }
                    else
                     {this.div12=true;this.div11=false;
                      //this.displayd11='none';this.displayd12='block';
                    }
                this.div2=false;
                //this.displayd2='none';
                this.div3=false;
                });




        });

       
        
          }
        
      



      /*
      
       this.searchservice.formsrch(this.frmYelpSearch.value,this.latitude,this.longitude).subscribe(response => {console.log(response);
        this.bizres = response;console.log(this.bizres.businesses);
        if(this.bizres&&this.bizres.businesses.length>=1)
           {this.div11=true;this.div12=false;
            //this.displayd11='block';this.displayd12='none';
          }
          else
           {this.div12=true;this.div11=false;
            //this.displayd11='none';this.displayd12='block';
          }
      this.div2=false;
      //this.displayd2='none';
      this.div3=false;
      });*/
        
        
    }  

    formreset()
  {
    this.frmYelpSearch = this._fb.group({  
      ac:"",
      Distance: ['10', Validators.required],
      Category:"All",
      Location:"",
      Autolocation: false

  }); 
  this.ac = new FormControl();

    /*this.frmYelpSearch.controls['Location'].setValue("");
    
    this.frmYelpSearch.controls['ac'].setValue("");

    this.frmYelpSearch.get('Location')?.enable();
    
    this.frmYelpSearch.controls['Category'].setValue("Default");
    
    this.frmYelpSearch.controls['Distance'].setValue("10");
    
    this.frmYelpSearch.controls['Autolocation'].setValue(false);*/

   
  this.div11=false;
  this.div12=false;
  this.div2=false;
  this.div3=false;


  }

    public getsummary(value) {  
      
       this.searchservice.getsummary(value).subscribe(response => {console.log(response);
        this.specificbiz = response;console.log(this.specificbiz);
        this.div11=false;
        //this.displayd12='none';this.displayd11='none';
        this.div12=false;
      this.div2=true;
      //this.displayd2='none';
      this.div3=false;
      console.log(this.div2);
      this.bname=this.specificbiz.name;
      if(this.specificbiz.hasOwnProperty("url")&&this.specificbiz.url!==''){this.yelpurl=this.specificbiz.url;this.ylink=true;}
      if(this.specificbiz.hasOwnProperty("price")&&this.specificbiz.price!==''){this.pricerange=this.specificbiz.price;this.price=true;}
      if(this.specificbiz.hasOwnProperty("display_phone")&&this.specificbiz.display_phone!==''){this.phone=this.specificbiz.display_phone;this.phn=true;}
      if(this.specificbiz.hasOwnProperty("photos"))
      {
        if(this.specificbiz.photos[0]!=""){this.p1=this.specificbiz.photos[0];this.i1=true;console.log(this.p1);console.log(this.i1);}
        
        if(this.specificbiz.photos[1]!=""){this.p2=this.specificbiz.photos[1];this.i2=true;console.log(this.p2);console.log(this.i2);}
        
        if(this.specificbiz.photos[2]!=""){this.p3=this.specificbiz.photos[2];this.i3=true;console.log(this.p3);console.log(this.i3);}

         
      }
      if(this.specificbiz.hasOwnProperty("coordinates"))
      {
        this.bizlat=this.specificbiz.coordinates.latitude;
        
        this.bizlong=this.specificbiz.coordinates.longitude;
        console.log(parseFloat(this.bizlat));
      this.mapOptions= {
        center: //{ lat: 38.9987208, lng: -77.2538699 },
        { lat: parseFloat(String(this.bizlat)), lng: parseFloat(String(this.bizlong)) },
        zoom : 14
     }
     this.marker = {
        position: 
        //{ lat: 38.9987208, lng: -77.2538699 }
        { lat: +parseFloat(this.bizlat), lng: +parseFloat(this.bizlong) }
     }

      }



      if(this.specificbiz.hasOwnProperty("location")&&this.specificbiz.location.hasOwnProperty("display_address")&&(this.specificbiz.location.display_address.length>=1))
       { 
   var daddr="";
   for(var k=0;k<this.specificbiz.location.display_address.length;k++)
      {var c=this.specificbiz.location.display_address[k];
      if(c)
       daddr+=c+" ";}
       this.address=daddr;
       this.addr=true;}
    
       if(this.specificbiz.hasOwnProperty("categories")&&(this.specificbiz.categories.length>=1))
{ 
   var cate="";
   for(var k=0;k<this.specificbiz.categories.length-1;k++)
      {var c=this.specificbiz.categories[k].title;
      if(c)
       cate+=c+"|";}
       var c=this.specificbiz.categories[k].title;
       if(c)
       cate+=c;
       this.category=cate;
       this.cat=true;}
    
       if((this.specificbiz.hasOwnProperty("hours"))&& this.specificbiz.hours.length>=1)
       if(this.specificbiz.hours[0].hasOwnProperty("is_open_now"))
      { 
       if(this.specificbiz.hours[0].is_open_now!==''){
       var statu=this.specificbiz.hours[0].is_open_now;
        console.log(statu);
       if(statu===true) 
       {this.status="Open Now";this.col='green';this.sta=true;}
       else {this.status="Closed";this.col='red';this.sta=false;}}
      }
      var nameurl="Check "+this.specificbiz.name+" on Yelp. "+"\n";
      this.twittxt=encodeURI(nameurl);
    });

    this.searchservice.getspecificbizreviews(value).subscribe(res => {console.log(res);
      this.reviews = res;console.log(this.reviews);
      if(this.reviews&& this.reviews.length>=1)
      {this.revtab=true;}});
      
      

      
      


    }  
    get Math() {
      return Math;
    }
    math=this.Math;
  

 

}
