import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})

export class ProductlistComponent implements OnInit {
  private productdetail = [];
  private search = {
	  sortfield:'title'
  };
  pager: any = {};
  private flashMessage;
  private siteUrl = "http://localhost:8081/";
  constructor(private route:ActivatedRoute ,private router:Router, private http:HttpClient) { }

  ngOnInit() {
	  this.flashMessage = localStorage.getItem('message');
	  localStorage.removeItem('message');
	  this.http.get(this.siteUrl+"product/index").subscribe(result=>{
	      if(result['success']=="1"){	               		 
			  this.productdetail = result['records'];
		  }    
	  });
  }
  
  remove(productid){
	  this.http.delete(this.siteUrl+"product/delete/"+productid).subscribe(result=>{
		     if(result['success']==1){
				location.reload(); 
			 }
	  });
  }
  
  sortlist(field){
	  
  }
}
