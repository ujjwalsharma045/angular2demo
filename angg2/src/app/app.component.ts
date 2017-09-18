import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
	
	private isLogin:boolean;
	
	constructor(private route: ActivatedRoute, private router: Router){
 	    
	}
	
	ngOnInit() {
		if(window.location.pathname!="/login" && window.location.pathname!="/register"){
            this.isLogin = false; 
		}
		else {
			this.isLogin = true; 
		}
    }
}
