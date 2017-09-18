import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    { path: 'users', title: 'Users',  icon:'ti-user', class: '' },
	{ path: 'pages', title: 'Pages',  icon:'ti-user', class: '' },
	{ path: 'settings', title: 'Setting',  icon:'ti-user', class: '' },
    /*{ path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '' },
    { path: 'typography', title: 'Typography',  icon:'ti-text', class: '' },
    { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },*/
];

@Component({
    moduleId: module.id,
    selector: 'router-outlet[name="sidebar"]',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
	
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
	
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
}
