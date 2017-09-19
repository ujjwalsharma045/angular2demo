import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})

export class ProductviewComponent implements OnInit {
  private siteUrl = "";
  private pageid = "";
  private pageDetail = {};
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
	    this.route.params.subscribe(params => {
           this.pageid = params['id'];
        });
		
		this.http.get(this.siteUrl+"view/"+this.pageid).subscribe(result=>{
			 if(result['success']==1){
				 this.pageDetail = result['records'][0];		
			 }
	    });  
  }
}
