import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl , AbstractControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {

  categoryForm:FormGroup;
  private siteUrl = "http://localhost:8081/";
  private submitted = false;
  private categoylistsection = false;
  private categorylists = []; 
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
     this.categoryForm = formBuilder.group({
		 'title':[null, Validators.required],      
		 'category_type':[null , Validators.required],
		 'category':[null],
		 'description':[null, Validators.required],
		 'meta_tag':[null, Validators.required],
		 'meta_description':[null, Validators.required],
		 'order':[null, Validators.required],		 
		 'status':[null, Validators.required]			
	 }, {validator:this.checkCategoryType});
  }

  ngOnInit() {	  
	  this.http.get(this.siteUrl+"category/parent").subscribe(result=>{
	        if(result['success']=="1"){
				this.categorylists = result['records'];
			}
	  });
  }

  setCategoryList(val){
	  if(val=="S"){		  
		  this.categoylistsection = true;
	  }
	  else {		  
		  this.categoylistsection = false;
	  }
  }
  
  addcategory(){
	  this.submitted = true;
	  if(this.categoryForm.valid){
		  var catedata = this.categoryForm.value;
		  this.http.post(this.siteUrl+"category/add" , catedata).subscribe(result=>{
		      if(result['success']=="1"){
				  localStorage.setItem('message' , result['message']); 
				  this.router.navigate(['./category']);	  
			  }
		  });
	  }
  }

  checkCategoryType(AC : AbstractControl){
	  let categoryType = AC.get('category_type').value;
	  let category = AC.get('category').value;	  
	  if(categoryType=="S"){		 
		  if(category==""){			  
			  AC.get('category').setErrors({checkCategoryType:null});
			  
		  }
		  else {
             AC.get('category').setErrors(null);			  
			 return null;  
		  }
	  }
	  else {
          AC.get('category').setErrors(null);		  
		  return null;
	  }
  }   
}
