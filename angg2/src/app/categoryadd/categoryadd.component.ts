import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {

  categoryForm:FormGroup ;
  private siteUrl = "http://localhost:8081/";
  private submitted = false;
  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
     this.categoryForm = formBuilder.group({
		 'title':[null, Validators.required],      
		 'description':[null, Validators.required],
		 'meta_tag':[null, Validators.required],
		 'meta_description':[null, Validators.required],
		 'order':[null, Validators.required],		 
		 'status':[null, Validators.required]			
	 });
  }

  ngOnInit() {
  }

  addcategory(){
	  this.submitted = true;
	  if(this.categoryForm.valid){
		  var catedata = this.categoryForm.value;
		  this.http.post(this.siteUrl+"category/add" , catedata).subscribe(result=>{
		      if(result['success']=="1"){
				  this.router.navigate(['./category/index']);	  
			  }
		  });
	  }
  } 
}
