import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
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
  private siteUrl = "";
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient, private formBuilder:FormBuilder) { 
     this.productForm = formBuilder.group({
		 'title':[null , Validators.required],
		 'description':[null , Validators.required],
		 'price':[null , Validators.required],
		 'cost':[null , Validators.required]
	 });
  }

  ngOnInit() {
	  
  }

  editproduct(){
	  this.submitted = true;
	  if(this.productForm.valid){
		  var product = this.productForm.value;
		  this.http.post(this.siteUrl+"product/edit" , product).subscribe(result=>{
		     if(result['success']=="1"){
				 this.router.navigate(['./products']);	  
			 }
		  }); 
	  }
  } 
  
}
