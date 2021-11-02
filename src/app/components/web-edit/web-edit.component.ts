import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { checkAvailabilityId, getObjectId, getIdArray } from '../../functions/component.function';
import { UserService } from '../../services/user.service';
import { WebService } from '../../services/web.service';
import { User } from '../../models/user';
import { Web } from '../../models/web';
import { Label } from '../../models/label';
import { global } from '../../services/global';

@Component({
  selector: 'app-web-edit',
  templateUrl: '../web-add/web-add.component.html',
  styleUrls: ['./web-edit.component.css'],
  providers: [UserService, WebService]
})
export class WebEditComponent implements OnInit {

  public page_title: string;
  public page_subTitle: string;
  public page_saveOk: string;
  public page_saveKo: string;  
  public page_submit: string;
  public identity;
  public token;
  public web: Web;
  public label: Label;
  public labels: Array<Label>;
  public addLabels: Array<Label> = [];
  public formLabels: Array<any>;
  public status;
  public addedLabel;  
  public ngxSummernote_config;

  constructor(
	private _route: ActivatedRoute,
	private _router: Router,
	private _userService: UserService,
	private _webService: WebService
  ) { 
  	this.page_title = 'Editar favorito';
    this.page_subTitle = 'Modifica la web mediante el formulario';
    this.page_saveOk = 'La web se ha modificado correctamente :)';
    this.page_saveKo = 'La web no se ha modificado :(';
    this.page_submit = 'Modificar favorito';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();    
  	this.web = new Web(1, this.identity.sub, '', '', '', '', '', 1, null); 
    this.ngxSummernote_config = global.ngxSummernote_config;
  }

  ngOnInit(): void {
    this.getLabels(this.token, this.identity.sub);
  	this.getWeb(this.token);
  }

  onSubmit(form){

    // Añadir las etiquetas al objeto
    this.formLabels = getIdArray(this.addLabels);
    this.web.label_id = this.formLabels;

    // Editar web
    this._webService.update(this.token, this.web, this.web.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.web = response.web;
          this.status = 'success';
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

  getLabels(token, id){

    this._userService.getLabels(token, id).subscribe(
      response => {
        if(response.status == 'success'){
          this.labels = response.labels;
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  addLabel(id, text) {  
    var checkExist;  

    // Etiqueta que se añade
    this.label = new Label(id, this.identity.sub, text); 

    // Valida si ya ha sido añadida
    checkExist = checkAvailabilityId(this.addLabels, this.label.id);

    if(checkExist==false){
      // Si no existe, se añade y se elimina del selector
      this.addLabels.push(this.label);  
      this.labels.splice(getObjectId(this.labels,this.label.id),1);

     }
    
    
  }

  removeLabel(label) {

    // Se elimina de las etiqeutas agregadas
    this.addLabels.splice(getObjectId(this.addLabels,label.id),1);

    // Se añade de nuevo en la ista del selector
    this.labels.push(label); 

    //console.log(this.addLabels);
  }

  getWeb(token){
  	// Sacar el id de la web de la url
  	this._route.params.subscribe(params => {
  		let id = +params['id'];
  		let edlabels = [];

	  	// Petición ajax para sacar los datos
	  	this._webService.getWeb(token, id).subscribe(
	 		response => {
	 			if(response.status == 'success'){
	 				this.web = response.webs;
	 				edlabels = response.webs.labels;

	 				// Se añaden las etiquetas de la web
	 				for(let edlabel of edlabels){
	 					this.addLabel(edlabel.id, edlabel.name);
	 				}				

	 				if(this.web.user_id != this.identity.sub){
	 					this._router.navigate(['/mis-favoritos']);
	 				}

	 			}else{
	 				this._router.navigate['/mis-favoritos'];
	 			}
	 		},
	 		error => {
	 			console.log(error);
	 			this._router.navigate['/mis-favoritos'];
	 		}		
	  	);

  	});

 }

}
