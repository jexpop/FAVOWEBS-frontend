import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'FAVOWEBS';
  public identity;
  public token;
  public url;
  public search;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(){
  	console.log(this.identity);
  	console.log(this.token);
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/login']);
  }

  /*goSearch(){
    this._router.navigate(['buscar', this.search]);
  }*/

}
