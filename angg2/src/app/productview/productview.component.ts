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
  private siteUrl = "http://localhost:8081/";
  private productid = "";
  private productDetail = {};
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
	    this.route.params.subscribe(params => {
           this.productid = params['id'];
        });
		
		this.http.get(this.siteUrl+"product/view/"+this.productid).subscribe(result=>{
			 if(result['success']==1){
				 this.productDetail = result['records'][0];		
			 }
	    });  
  }
}
