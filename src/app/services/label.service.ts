import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { fs_headers, fs_params } from '../functions/service.function';
import { global } from './global';

@Injectable()
export class LabelService {

	public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
	}

	create(token, label):Observable<any>{

		let params = fs_params(label);
		let headers = fs_headers(token);

		return this._http.post(this.url + 'label', params, {headers: headers});
	}

	getLabel(token, id):Observable<any>{

		let headers = fs_headers(token);
		
		return this._http.get(this.url + 'label/' + id, {headers: headers});		
	}

	update(token, label, id):Observable<any>{
		
		let params = fs_params(label);
		let headers = fs_headers(token);

		return this._http.put(this.url + 'label/' + id, params, {headers: headers});		
	}

	delete(token, id):Observable<any>{

		let headers = fs_headers(token);

		return this._http.delete(this.url + 'label/' + id, {headers: headers});		
	}

}