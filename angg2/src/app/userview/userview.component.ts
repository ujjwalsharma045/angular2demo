import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'userview-cmp',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})

export class UserviewComponent implements OnInit {

    public user = [];
  
    private userid;
  
    private sectionTitle = 'View User';
	
	private userUrl = 'http://localhost:8081/';
  
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { 
	
	}

    ngOnInit() {
	    this.route.params.subscribe(params => {		    
           this.userid = params['id']; 			
        });
	  
        this.sectionTitle = this.sectionTitle+' '+this.userid;
		
        this.getUser(this.userid).subscribe(result => {
		    console.log(result['records'][0]);
		    this.user  = result['records'][0];	 	   
	    });	 
    }
	
	getUser(id){
	    return this.http.get(this.userUrl+"view/"+id);
    }
}
