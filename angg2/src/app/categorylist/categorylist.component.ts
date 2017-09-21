import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  private siteUrl = "";
  private categoryDetail = [];  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
	  this.http.get(this.siteUrl+"/category/index").subscribe(result=>{
		  if(result['success']=="1"){
			 this.categoryDetail = result['records'];
		  }
	  });
  }
  
  remove(id){	
	  this.http.delete(this.siteUrl+"/category/delete/"+id).subscribe(result=>{
	       if(result['success']=="1"){
			   
		   }
	  });
  }
}
