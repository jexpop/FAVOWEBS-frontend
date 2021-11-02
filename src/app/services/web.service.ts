import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { fs_headers, fs_params } from '../functions/service.function';
import { global } from './global';

@Injectable()
export class WebService {

	public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
	}

	create(token, web):Observable<any>{
		// Limpiar campo content (editor texto enriquecido) htmlEntities > utf8
		web.comment = global.htmlEntities(web.comment);

		let params = fs_params(web);
		let headers = fs_headers(token);

		return this._http.post(this.url + 'web', params, {headers: headers});
	}

	getWeb(token, id):Observable<any>{

		let headers = fs_headers(token);
		
		return this._http.get(this.url + 'web/' + id, {headers: headers});		
	}

	update(token, web, id):Observable<any>{
		// Limpiar campo content (editor texto enriquecido) htmlEntities > utf8
		web.comment = global.htmlEntities(web.comment);
		
		let params = fs_params(web);
		let headers = fs_headers(token);

		return this._http.put(this.url + 'web/' + id, params, {headers: headers});		
	}

	delete(token, id):Observable<any>{

		let headers = fs_headers(token);

		return this._http.delete(this.url + 'web/' + id, {headers: headers});		
	}

}