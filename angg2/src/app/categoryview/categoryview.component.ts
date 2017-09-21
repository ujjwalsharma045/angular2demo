import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.css']
})

export class CategoryviewComponent implements OnInit {
	
  private categoryDetail;
  private siteUrl = "";
  private categoryid = "";
  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
	  
	  this.route.params.subscribe(params => {
           this.categoryid = params['id'];
      });
		
	  this.http.get("category/view/"+this.categoryid).subscribe(result=>{
	      if(result['success']=="1"){
			  this.categoryDetail = result['records'];
		  }
	  });
  }
}
