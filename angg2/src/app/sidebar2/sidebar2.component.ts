import { Component, OnInit } from '@angular/core';

declare var $:any;


@Component({
    moduleId: module.id,
    selector: 'sidebar2-cmp',
    templateUrl: 'sidebar2.component.html',
})

export class Sidebar2Component implements OnInit {
    
	
    ngOnInit() {
        
    }
	
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
}
