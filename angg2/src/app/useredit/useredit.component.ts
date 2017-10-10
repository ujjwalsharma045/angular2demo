import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl , AbstractControl} from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'useredit-cmp',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

    public user = {};   
    private userForm: FormGroup;
    private submitted = false;
    private sectionTitle = 'Add User';
    private fileList:any;
    userUrl = "http://localhost:8081/";
    private userid = "" 
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) {
        this.userForm = formBuilder.group({      
			'first_name':[null, Validators.required],
			'last_name':[null, Validators.required],
			'password':[""],
			'confirm_password':[""],
			'address' : [null, Validators.required],
		    'city' : [null, Validators.required],
		    'state' : [null, Validators.required],
			'zipcode' : [null]
        },{validator:this.checkPassword});	    
    }

    ngOnInit() {
		this.route.params.subscribe(params => {
            this.userid = params['id'];
        });
		
		this.getUser(this.userid).subscribe(result => {
		   console.log(result['records'][0]);
		   this.userForm.patchValue(result['records'][0]);	 	   		  
	    });
    }
  
    userEdit(){
	    this.submitted = true;
        if(this.userForm.valid){
		    this.http.post(this.userUrl+"edit/"+this.userid , this.userForm.value).subscribe(result => {
				if(result['success']=="1"){
					localStorage.setItem('message' , result['message']);
					this.router.navigate(['./users']);	  
				}
			}); 			  
	    }	   
    }
	
	getUser(id){		
	    return this.http.get(this.userUrl+"view/"+id);
    }

	checkPassword(AC:AbstractControl){
	   let passwordstrng = AC.get('password').value;
       let confirmpasswordstrng = AC.get('confirm_password').value;
	   AC.get('password').setErrors(null);
	   AC.get('confirm_password').setErrors(null);
	   if(passwordstrng!=""){
		   if(confirmpasswordstrng==""){
		       AC.get('confirm_password').setErrors({required:true});
		   }
		   else if(confirmpasswordstrng!=passwordstrng){
		      AC.get('confirm_password').setErrors({mismatch:true});
		   }
		   else {
			  return null; 
		   }
	   }
	   else if(confirmpasswordstrng!=""){
		   if(passwordstrng==""){
		      AC.get('password').setErrors({required:true});
		   }
		   else if(confirmpasswordstrng!=passwordstrng){
		      AC.get('confirm_password').setErrors({mismatch:true});
		   }
		   else {
			  return null; 
		   }
	   }
	   else {		   
		   return null;
	   }        	  
	} 
}
