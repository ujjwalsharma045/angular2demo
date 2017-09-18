import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'register-cmp',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    private submitted = false;
    private sectionTitle = 'Add User';
	registerUrl = "";
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
        this.registerForm = formBuilder.group({      
			'username':[null, Validators.required],      
			'email':[null, Validators.required],
			'password':[null, Validators.required],
			'first_name':[null, Validators.required],
			'last_name':[null, Validators.required],
			'address' : [null, Validators.required],
		    'city' : [null, Validators.required],
		    'state' : [null, Validators.required]
        });
    }

    ngOnInit() {
		
    }
	
	register(){  
	    this.submitted = true;	      
	    if(this.registerForm.valid){ 
		    this.http.post(this.registerUrl+"register" , this.registerForm.value).subscribe(result => {
				if(result['success']=="1"){
					this.router.navigate(['./login']);	  
				}
			}); 			
	    }		
    }
}
