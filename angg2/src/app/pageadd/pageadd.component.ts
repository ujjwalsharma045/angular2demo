import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'pageadd-cmp',
  templateUrl: './pageadd.component.html',
  styleUrls: ['./pageadd.component.css']
})

export class PageaddComponent implements OnInit {
    pageForm:FormGroup;
    private submitted =false;
	pageUrl = "http://localhost:8081/";
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
        this.pageForm = formBuilder.group({      
			'title':[null, Validators.required],      
			'content':[null, Validators.required],
			'status':[null, Validators.required]			
        });  
    }

    ngOnInit() {
		
    }

    pageAdd(){
	    this.submitted =true;
	    if(this.pageForm.valid){
		    this.add(this.pageForm.value).subscribe(result => {
				  //console.log(result);
				  if(result['success']=="1"){
					 localStorage.setItem('message' , result['message']); 
					 this.router.navigate(['./pages']);	  
				  }
			});
	    } 
    }
	
	add(page){
		return this.http.post(this.pageUrl+"page/add" , page);
	}
}
