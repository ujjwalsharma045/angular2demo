import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl , AbstractControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})

export class ProducteditComponent implements OnInit {
  productForm:FormGroup;
  private submitted = false;
  private siteUrl = "http://localhost:8081/";
  private productid;
  private productsection = false;
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private formBuilder:FormBuilder) { 
     this.productForm = formBuilder.group({
		 'title':[null, Validators.required],
		 'description':[null , Validators.required],
		 'meta_tag':[null , Validators.required],
		 'meta_description':[null , Validators.required],
		 'price':[null , Validators.required],
		 'cost_price':[null , Validators.required],
		 'discount_flag':[null , Validators.required],
		 'discount_type':[null],
		 'discount':[null],
		 'status':[null , Validators.required]
	 }, {validator:this.checkDiscount});
  }

  ngOnInit() {
	  this.route.params.subscribe(params => {
           this.productid = params['id'];
      });
		
	  this.http.get(this.siteUrl+"product/view/"+this.productid).subscribe(result=>{
			 if(result['success']==1){
				 //this.productDetail = result['records'][0];	
                 this.productForm.patchValue(result['records'][0]);	 	   		  				 
			 }
	  });
  }

  getproductBlock(val){	  
	  if(val=="Y"){		 
		 this.productsection = true;
	  } 
      else {
         this.productForm.patchValue({'discount_type':''});
		 this.productForm.patchValue({'discount':''}); 		  
		 this.productsection = false;
	  }
  } 
  
  editproduct(){
	  this.submitted = true;
	  if(this.productForm.valid){
		  var product = this.productForm.value;
		  this.http.post(this.siteUrl+"product/edit/"+this.productid , product).subscribe(result=>{
		     if(result['success']=="1"){
				 this.router.navigate(['./products']);	  
			 }
		  }); 
	  }
  }

  checkDiscount(AC:AbstractControl){
	  let discount = AC.get('discount_flag').value;
	  let discountype = AC.get('discount_type').value;
	  let discountvalue = AC.get('discount').value;
	  AC.get('discount_type').setErrors(null);
      AC.get('discount').setErrors(null);
	  if(discount=="Y"){		  		 
		  if(discountype!="" && discountvalue!=""){
			 return null; 
		  }
		  else {
			  if(discountype==""){
			      AC.get('discount_type').setErrors( {required: true} );
		      }
		  
			  if(discountvalue==""){
				  AC.get('discount').setErrors( {required: true} );
			  }
		  }
	  }
	  else {		  
		  return null;
	  }
  }     
}
