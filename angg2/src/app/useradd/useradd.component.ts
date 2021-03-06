import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl , AbstractControl} from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'useradd-cmp',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})

export class UseraddComponent implements OnInit {
    
	public user = {}; 
  
    userForm: FormGroup;
    private submitted = false;
    private sectionTitle = 'Add User';
	private fileList:any;
	userUrl = "http://localhost:8081/";
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
        this.userForm = formBuilder.group({      
			'username':[null, Validators.required],      
			'email':[null, Validators.required],
			'password':[null, Validators.required],
			'confirm_password':[null, Validators.required],
			'first_name':[null, Validators.required],
			'last_name':[null, Validators.required],
			'address' : [null, Validators.required],
		    'city' : [null, Validators.required],
		    'state' : [null, Validators.required],
			'zipcode' : [null]
        },{validator:this.matchPassword});
    }

    ngOnInit() {
	      
    }
	
	userAdd(){
	    this.submitted = true;	      
	    if(this.userForm.valid){ 
		    this.http.post(this.userUrl+"adduser" , this.userForm.value).subscribe(result => {
				if(result['success']=="1"){
					localStorage.setItem('message' , result['message']);
					this.router.navigate(['./users']);	  
				}
			}); 			
	    }		
    }
	
	matchPassword(AC:AbstractControl){
		let passwordfield = AC.get('password').value;
		let confirm_password = AC.get('confirm_password').value;
		if(passwordfield!="" && confirm_password!="" && passwordfield!=confirm_password){
			AC.get('confirm_password').setErrors({mismatch:true});
		}
		else {			
			return null
		}
	}
}
