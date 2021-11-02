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
  selector: 'app-web-add',
  templateUrl: './web-add.component.html',
  styleUrls: ['./web-add.component.css'],
  providers: [UserService, WebService]
})
export class WebAddComponent implements OnInit {

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
  	this.page_title = 'Crear un nuevo favorito';
    this.page_subTitle = 'Crea una web favorita mediante el formulario';
    this.page_saveOk = 'La web se ha guardado correctamente :)';
    this.page_saveKo = 'La web no se ha guardado :(';
    this.page_submit = 'Agregar favorito';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();    
  	this.web = new Web(1, this.identity.sub, '', '', '', '', '', 1, null); 
    this.ngxSummernote_config = global.ngxSummernote_config;    
  }

  ngOnInit(): void {
    this.getLabels(this.token, this.identity.sub);
  }

  onSubmit(form){

    // Añadir las etiquetas al objeto
    this.formLabels = getIdArray(this.addLabels);
    this.web.label_id = this.formLabels;

    //console.log(this.web);

    // Guardar web
    this._webService.create(this.token, this.web).subscribe(
      response => {
        if(response.status == 'success'){
          this.web = response.web;
          this.status = 'success';
          this._router.navigate(['/mis-favoritos']);
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
          //console.log(this.labels);
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
    
    //console.log(this.addLabels);
  }

  removeLabel(label) {

    // Se elimina de las etiqeutas agregadas
    this.addLabels.splice(getObjectId(this.addLabels,label.id),1);

    // Se añade de nuevo en la ista del selector
    this.labels.push(label); 

    //console.log(this.addLabels);
  }


}
