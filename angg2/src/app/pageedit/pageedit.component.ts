import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'pageedit-cmp',
  templateUrl: './pageedit.component.html',
  styleUrls: ['./pageedit.component.css']
})

export class PageeditComponent implements OnInit {
	
	public page = {};   
    private pageForm: FormGroup;
    private submitted = false;
    private sectionTitle = 'Add Page';
    private fileList:any;
    pageUrl = "http://localhost:8081/";
	
    private pageid;
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { 
	    this.pageForm = formBuilder.group({      
		    'title':[null, Validators.required], 
			'content':[null, Validators.required],
			'status':[null, Validators.required]			
        });
	}

    ngOnInit(){
	    this.route.params.subscribe(params => {
            this.pageid = params['id'];
        });
		
		this.getPage(this.pageid).subscribe(result => {
		   console.log(result['records'][0]);
		   this.pageForm.patchValue(result['records'][0]);	 	   		  
	    });
    }
	
	pageEdit(){
	    this.submitted = true;
        if(this.pageForm.valid){
		    this.http.post(this.pageUrl+"page/edit/"+this.pageid , this.pageForm.value).subscribe(result => {
				if(result['success']=="1"){
					this.router.navigate(['./pages']);	  
				}
			}); 			  
	    }	   
    }
	
	getPage(id){		
	    return this.http.get(this.pageUrl+"page/view/"+id);
    }
}
