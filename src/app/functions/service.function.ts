import { HttpHeaders } from '@angular/common/http';

export function fs_headers(token=null){

	// Por defecto
	var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

	// Con token
	if(token){
		var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
	}

	return headers;
}

export function fs_params(object){
	let json = JSON.stringify(object);
	return 'json='+json;
}
