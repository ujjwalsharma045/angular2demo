import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-categoryedit',
  templateUrl: './categoryedit.component.html',
  styleUrls: ['./categoryedit.component.css']
})
export class CategoryeditComponent implements OnInit {

  categoryForm:FormGroup;
  private siteUrl = "http://localhost:8081/";
  private categoryDetail;
  private submitted = false;
  private categoryid = "";
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
      this.route.params.subscribe(params => {
          this.categoryid = params['id'];
      });

      this.http.get("category/view/"+this.categoryid).subscribe(result=>{
	      if(result['success']=="1"){
			  this.categoryDetail = result['records'];
		  }
	  });	  
  }

  addcategory(){
	  this.submitted = true;
	  if(this.categoryForm.valid){
		  var catedata = this.categoryForm.value;
		  this.http.post(this.siteUrl+"category/edit/"+this.categoryid , catedata).subscribe(result=>{
		      if(result['success']=="1"){
				 this.router.navigate(['./category/index']);	   
			  }
		  });
	  }
  } 
}
