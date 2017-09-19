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
  private ProductDetail = [];
  private siteUrl = "";
  constructor(private route:ActivatedRoute ,private router:Router, private http:HttpClient) { }

  ngOnInit() {
	  this.http.get(this.siteUrl).subscribe(result=>{
	      if(result['success']=="1"){
			  this.ProductDetail = result['records'];
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
}
