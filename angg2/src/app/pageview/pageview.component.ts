import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'pageview-cmp',
  templateUrl: './pageview.component.html',
  styleUrls: ['./pageview.component.css']
})

export class PageviewComponent implements OnInit {
	
	private pageid;
	private pageDetail = {};
	private sectionTitle = 'View Page';
	private pageUrl = 'http://localhost:8081/';
	
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }
  
    ngOnInit() {
	    this.route.params.subscribe(params => {
           this.pageid = params['id'];
        });
		this.sectionTitle = this.sectionTitle+' '+this.pageid;
		this.view(this.pageid).subscribe(result => {
			console.log(result);
			alert("cxg");
			this.pageDetail = result['records'][0];			   
		});
    }
	
	view(pageid){
		return this.http.get(this.pageUrl+"page/view/"+pageid);
	}
}
