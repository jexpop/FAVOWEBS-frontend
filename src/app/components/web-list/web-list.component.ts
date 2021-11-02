import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Label } from '../../models/label';
import { Web } from '../../models/web';
import { UserService } from '../../services/user.service';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-web-list',
  templateUrl: './web-list.component.html',
  styleUrls: ['./web-list.component.css'],
  providers: [UserService, WebService]
})
export class WebListComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public label: Label;
  public webs: Array<Web>;

  constructor(
      private _router: Router,
    	private _userService: UserService,
      private _webService: WebService
  ) { 
  
  	this.page_title = 'Mis webs favoritas';
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {

    if(this.identity){
      this.getWebs(this.token, this.identity.sub);
    }else{
      // Si no está identificado redirección a login
      this._router.navigate(['/login']);
    }

  }

  getWebs(token, id){

  	this._userService.getWebs(token, id).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.webs = response.webs;
          //console.log(this.webs);
   			}
  		},
  		error => {
  			console.log(error);
  		}
  	);

  }

  deleteWeb(id){

    this._webService.delete(this.token, id).subscribe(
      response => {
        this.getWebs(this.token, this.identity.sub);
      },
      error => {
        console.log(error);
      }
    );
  }

}
