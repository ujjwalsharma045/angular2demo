import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  
  productForm:FormGroup;
  private submitted = false;  
  private siteUrl = "http://localhost:8081/";
  private productsection;
  private discount_flag = "N";
  private discountGroup; 
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private formBuilder:FormBuilder) { 
     this.productForm = formBuilder.group({
		 'title':[null, Validators.required],
		 'description':[null , Validators.required],
		 'meta_tag':[null , Validators.required],
		 'meta_description':[null , Validators.required],
		 'price':[null , Validators.required],
		 'cost_price':[null , Validators.required],
		 'discount_flag':[null , Validators.required],
         'discount_type':[null , Validators.required],
         'discount':[null , Validators.required],		 		 
		 'status':[null , Validators.required]
	 });
  }

  ngOnInit() { 
      this.productsection =false;
  }  
 
  addproduct(){
	   
	 if(this.productForm.controls.discount_flag.value=="N"){
		this.productForm.patchValue({'discount_type':'....'});
        this.productForm.patchValue({'discount':'....'});  		
	 }
	 	 
	 
	 this.submitted = true;
	 
     if(this.productForm.valid){
		 var product = this.productForm.value;
		 this.http.post(this.siteUrl+"product/add" , product).subscribe(result=>{
			 if(result['success']=="1"){
				 localStorage.setItem('message' , result['message']);
				 this.router.navigate(['./products']);	  
			 }
		 });
	 }	 
  }

  checkDiscountFlag(val){	  
      if(val=="Y"){		  
		  this.productForm.patchValue({'discount_type':''}); 
		  this.productForm.patchValue({'discount':''}); 
		  this.productsection = true;
	  }
      else {
		  this.productsection = false;
	  }	  
  }  
}
