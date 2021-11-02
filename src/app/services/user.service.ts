import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { fs_headers, fs_params } from '../functions/service.function';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {

	public url: string;
	public identity;
	public token;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
	}

	signup(user, gettoken = null):Observable<any>{
		if(gettoken != null){
			user.gettoken = 'true';
		}

		let params = fs_params(user);
		let headers = fs_headers();

		return this._http.post(this.url+'login', params, {headers:headers});
	}

	update(token, user):Observable<any>{

		let params = fs_params(user);
		let headers = fs_headers(token);

		return this._http.put(this.url+'user/update', params, {headers:headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != 'undefined'){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token && token != 'undefined'){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	getUser(id):Observable<any>{

		let headers = fs_headers();
		
		return this._http.get(this.url + 'user/detail/' + id, {headers: headers});
	}

	getWebs(token, id):Observable<any>{

		let headers = fs_headers(token);
		
		return this._http.get(this.url + 'web/user/' + id, {headers: headers});
	}

	getLabels(token, id):Observable<any>{

		let headers = fs_headers(token);
		
		return this._http.get(this.url + 'label/user/' + id, {headers: headers});
	}

}