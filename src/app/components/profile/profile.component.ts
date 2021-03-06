import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
	public url: string;
	public user: User;
	public identity;
	public token;

  constructor(
    private _userService: UserService,
	  private _route: ActivatedRoute,
	  private _router: Router
  ) { 
  	this.url = global.url;
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  	this.getProfile();
  }

  getProfile(){
  	this._route.params.subscribe(params => {
  		let userId = +params['id'];  
  		this.getUser(userId);
  	});
  }

  getUser(userId){
  	this._userService.getUser(userId).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.user = response.user;
  			}
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

}