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
  
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private formBuilder:FormBuilder) { 
     this.productForm = formBuilder.group({
		 'title':[null, Validators.required],
		 'description':[null , Validators.required],
		 'price':[null , Validators.required],
		 'cost':[null , Validators.required]
	 });
  }

  ngOnInit() { 
  }  
 
  addproduct(){
	 this.submitted = true;
     if(this.productForm.valid){
		 var product = this.productForm.value;
		 this.http.post(this.siteUrl+"product/add" , product).subscribe(result=>{
			 if(result['success']=="1"){
				 this.router.navigate(['./products']);	  
			 }
		 });
	 }	 
  }	 
}
