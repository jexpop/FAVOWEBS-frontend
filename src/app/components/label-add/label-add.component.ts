import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LabelService } from '../../services/label.service';
import { User } from '../../models/user';
import { Label } from '../../models/label';

@Component({
  selector: 'app-label-add',
  templateUrl: './label-add.component.html',
  styleUrls: ['./label-add.component.css'],
  providers: [UserService, LabelService]
})
export class LabelAddComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public label: Label;
  public status;

  constructor(
	private _userService: UserService,
	private _labelService: LabelService
  ) { 
  	this.page_title = 'Crear una nueva etiqueta';  	
	this.identity = this._userService.getIdentity();
	this.token = this._userService.getToken();
	this.label = new Label(1, this.identity.sub, ''); 
  }

  ngOnInit(): void {
  }

  onSubmit(form){

    this._labelService.create(this.token, this.label).subscribe(
      response => {
        if(response.status == 'success'){
          this.label = response.label;
          this.status = 'success';
          //._router.navigate(['/mis-favoritos']);
        }else{

          this.status = 'error';

        }
        
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );

  }

}
