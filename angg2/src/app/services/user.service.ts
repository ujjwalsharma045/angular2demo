import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:8081/';
	private http: Http;
    constructor() { alert("fgvbq");}
  
    getUsers(data){
		alert("fgvb");
		if(data!=""){			  
			let params = new URLSearchParams();
			for(let key in data){
				params.set(key, data[key]) 
			}
			 
			return this.http.get(this.userUrl+"showusers?"+params.toString()).map(res => res.json()); 
		}
		else {
			return this.http.get(this.userUrl+"showusers").map(res => res.json());
		}	  
    }

}
