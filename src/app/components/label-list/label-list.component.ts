import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Label } from '../../models/label';
import { UserService } from '../../services/user.service';
import { LabelService } from '../../services/label.service';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css'],
  providers: [UserService, LabelService]
})
export class LabelListComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public labels: Array<Label>;
  public edit_label;

  constructor(
      private _router: Router,
    	private _userService: UserService,
      private _labelService: LabelService
  ) { 

  
  	this.page_title = 'Listado de etiquetas';
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.edit_label = 0;

  }

  ngOnInit(): void {

    if(this.identity){
      this.getLabels(this.token, this.identity.sub);
    }else{
      // Si no está identificado redirección a login
      this._router.navigate(['/login']);
    }

  }

  getLabels(token, id){

  	this._userService.getLabels(token, id).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.labels = response.labels; 
  				//console.log(this.labels);        		
   			}
  		},
  		error => {
  			console.log(error);
  		}
  	);

  }

  showEdit(id){
    this.edit_label = id;
  }

  cancelEdit(label){

    // Recuperamos el valor original de la etiqueta
    this._labelService.getLabel(this.token, label.id).subscribe(
      response => {
        if(response.status == 'success'){
          label.name = response.label.name; 
        }
      },
      error => {
        console.log(error);
      }
    );

    // Salimos del modo edición
    this.edit_label = 0;

  }

  saveEdit(label){

    // Evitamos que se envie las 'webs' en el objeto label
    var modLabel = new Label(label.id, label.user_id, label.name);

    // Guardamos la etiqueta modificada
    this._labelService.update(this.token, modLabel, label.id).subscribe(
      response => {
        if(response.status == 'success'){
          label = response.label; 
        }
      },
      error => {
        console.log(error);
      }
    );

    // Salimos del modo edición
    this.edit_label = 0;
  }

  deleteLabel(id){

    this._labelService.delete(this.token, id).subscribe(
      response => {
        this.getLabels(this.token, this.identity.sub);
      },
      error => {
        console.log(error);
      }
    );
  }

}
