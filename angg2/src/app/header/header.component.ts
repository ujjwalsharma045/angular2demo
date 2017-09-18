import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'router-outlet[name="header"]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    private title;
    constructor(private router: Router, private route:ActivatedRoute) { 
		router.events.filter(e => e instanceof NavigationEnd).forEach(e => {
			this.title = route.root.firstChild.snapshot.data['title'];
		}); 
    }

    ngOnInit() {
    }
	
	getTitle(){		
		return this.title;
    }
}
