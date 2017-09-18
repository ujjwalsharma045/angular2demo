import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'adminlogin-cmp',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

    private submitted =false;
    loginForm:FormGroup;
	private userUrl = "http://localhost:8081/";
	
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
        this.loginForm = formBuilder.group({      
			'username':[null, Validators.required],      
			'password':[null, Validators.required]
        });  
    }

    ngOnInit() {
		
    }
	
	login(){
		this.submitted = true;
		if(this.loginForm.valid){
			console.log(this.loginForm.value);
	        this.http.post(this.userUrl+"login", this.loginForm.value).subscribe(result => {
				console.log(result);
				if(result['success']==1){
				   alert("cfgh");
				   //localStorage.setItem('is_logged_in' , '1');
				   this.router.navigate(['./users']);	  
				}
				else {
				  
				}
			}); 	  	  
		}
	}

}
