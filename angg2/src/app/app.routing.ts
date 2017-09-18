import { Routes } from '@angular/router';
import { SidebarComponent }   from './sidebar/sidebar.component';
import { NavbarComponent }   from './shared/navbar/navbar.component';
import { FooterComponent }   from './shared/footer/footer.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { UsersComponent } from './users/users.component'; 
import { UseraddComponent } from './useradd/useradd.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UserviewComponent } from './userview/userview.component';

import { PagesComponent } from './pages/pages.component'; 
import { PageaddComponent } from './pageadd/pageadd.component';
import { PageeditComponent } from './pageedit/pageedit.component';
import { PageviewComponent } from './pageview/pageview.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
		data : {title : 'Dashboard'},
		children:[
		   { path: '', component:SidebarComponent, outlet:'sidebar'}, 
           { path: '', component:NavbarComponent, outlet:'navbar'},
           { path: '', component:FooterComponent, outlet:'footer'}
		],
    },
    /*{
        path: 'user',
        children:[
		   { path: 'add', component:UseraddComponent, data : {somedata : 'some value'}}, 
           { path: 'edit/:id', component:UsereditComponent},
           { path: 'view/:id', component:UserviewComponent}
		],		
    },*/
	{
        path: 'user/add',
        component:UseraddComponent, 
		data:{title:'Add User'}
    },
	{
        path: 'user/edit/:id',
		component:UsereditComponent, 
		data:{title:'Edit User'}        	
    },
	{
        path: 'user/view/:id',
		component:UserviewComponent, 
		data:{title:'View User'}        	        	
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    }, 
	{
        path: 'users',
        component: UsersComponent,
		data:{title:'Users'},
		children:[
		   { path: '', component:SidebarComponent, outlet:'sidebar'}, 
           { path: '', component:NavbarComponent, outlet:'navbar'},
           { path: '', component:FooterComponent, outlet:'footer'}
		],
    },
	{
        path: 'pages',
        component: PagesComponent,
		data:{title:'Pages'},
		children:[
		   { path: '', component:SidebarComponent, outlet:'sidebar'}, 
           { path: '', component:NavbarComponent, outlet:'navbar'},
           { path: '', component:FooterComponent, outlet:'footer'}
		],
    },
	/* {
        path: 'page',
		children:[
		   { path: 'add', component:PageaddComponent}, 
           { path: 'edit/:id', component:PageeditComponent},
           { path: 'view/:id', component:PageviewComponent}
		],
    }, */
    {
        path: 'page/add',
		component:PageaddComponent,
		data:{title:'Add Page'}		
    },
    {
        path: 'page/edit/:id',
		component:PageeditComponent,
		data:{title:'Edit Page'}		
    },
    {
        path: 'page/view/:id',
		component:PageviewComponent,
		data:{title:'View Page'}		
    },	
	{
        path: 'settings',
        component: SettingsComponent,
		data:{title:'Settings'}
    },
	{
        path: 'login',
        component: AdminloginComponent,
		data:{title:'Sign-In'},
		children:[
		   { path: '', component:HeaderComponent, outlet:'header'},            
           { path: '', component:FooterComponent, outlet:'footer'}
		],
    },
	{
        path: 'register',
        component: RegisterComponent,
		data:{title:'Sign-Up'},
		children:[
		   { path: '', component:HeaderComponent, outlet:'header'},            
           { path: '', component:FooterComponent, outlet:'footer'}
		],
    }
]

export const LoginRoutes: Routes = [    
	/*{
        path: 'login',
        component: AdminloginComponent, 
		children:[
		   { path: '', component:HeaderComponent, outlet:'header'},
           { path: '', component:FooterComponent, outlet:'footer'}
		]
    }*/
]
