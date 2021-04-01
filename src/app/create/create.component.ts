import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {LaunchpadService} from '../launchpad.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title = 'Add Coin';
  angForm: FormGroup;
  data: any;
  temparray: any = [ ];
  filterarray:any= [ ];
  currentDate = new Date();
  years: any = [ ];
  booleandata= [true,false];
  onload=true;
  onyearfilter=false;
  selected :any;

  constructor(private launchservice: LaunchpadService,private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ]
   });
  }
 
  getCoins() {
    this.launchservice.getCoins().subscribe(res => {
      this.data = res;
     // debugger;
      for(var i=0;i<this.data.length;i++){
        this.temparray.push(
          {"name": this.data[i].mission_name,
           "launch_year":this.data[i].launch_year,
           "img":this.data[i].links.mission_patch,
           "mission_id":this.data[i].mission_id,
           "successful_launch":this.data[i].launch_success,
          // "successful_landing":
        })
      }
    });
  }
  addCoin(name, price) {
}
  ngOnInit(): void {
    this.getCoins();
   this.dateyear();
  }

  dateyear(){
    var currentYear = new Date().getFullYear();
       var startYear = 2006;
       for(var i=startYear; i<= currentYear; i++){
          this.years.push(startYear++);
       }
  }

  Yearfilter(event:any, val){
    console.log(val)
    this.selected = val;
    this.launchservice.getYearfilter(val).subscribe(res => {
      this.data = res;
      if(this.data.length== 0){
        alert("No Data to show!!");
      }
      this.onload=false;
      this.onyearfilter=true;
      this.filterarray=[];
     for(var i=0;i<this.data.length;i++){
      this.filterarray.push(
        {"name": this.data[i].mission_name,
         "launch_year":this.data[i].launch_year,
         "img":this.data[i].links.mission_patch,
         "mission_id":this.data[i].mission_id,
         "successful_launch":this.data[i].launch_success,
      })
    }
    });
  }


  isActive(val) {
    return this.selected === val;
};


  launchfilter(event:any, val){
    console.log(val)
    localStorage.setItem("launchfilter_value", val);
    this.launchservice.getlaunchfilter(val).subscribe(res => {
      this.data = res;
      if(this.data.length== 0){
        alert("No Data to show!!");
      }
      //debugger
      this.onload=false;
      this.onyearfilter=true;
      this.filterarray=[];
     for(var i=0;i<this.data.length;i++){
      this.filterarray.push(
        {"name": this.data[i].mission_name,
         "launch_year":this.data[i].launch_year,
         "img":this.data[i].links.mission_patch,
         "mission_id":this.data[i].mission_id,
         "successful_launch":this.data[i].launch_success,
      })
    }
    });
    debugger
  }

  landfilter(event:any, val){
    console.log(val)
    var launchpad = localStorage.getItem("launchfilter_value");
    this.launchservice.getlandfilter(val, launchpad).subscribe(res => {
      this.data = res;
      if(this.data.length== 0){
        alert("No Data to show!!");
      }
     // debugger
      this.onload=false;
      this.onyearfilter=true;
      this.filterarray=[];
     for(var i=0;i<this.data.length;i++){
      this.filterarray.push(
        {"name": this.data[i].mission_name,
         "launch_year":this.data[i].launch_year,
         "img":this.data[i].links.mission_patch,
         "mission_id":this.data[i].mission_id,
         "successful_launch":this.data[i].launch_success,
      })
    }
    });
    debugger
  }
}
