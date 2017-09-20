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

  CategoryForm:FormGroup ;
  private siteUrl = "";
  private submitted = false;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
     this.CategoryForm = formBuilder.group({
		 'title':[null, Validators.required],      
		 'content':[null, Validators.required],
		 'status':[null, Validators.required]			
	 });
  }

  ngOnInit() {
  }

  add(){
	  
  } 
}
