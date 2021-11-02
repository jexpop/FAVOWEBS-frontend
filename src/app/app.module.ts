import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; /* Para los popover de bootstrap */
import { NgxSummernoteModule } from 'ngx-summernote';

import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { WebListComponent } from './components/web-list/web-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelAddComponent } from './components/label-add/label-add.component';
import { WebAddComponent } from './components/web-add/web-add.component';
import { WebEditComponent } from './components/web-edit/web-edit.component';
import { ArraySortedPipe } from './functions/pipes/array-sorted.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    WebListComponent,
    ProfileComponent,
    UserEditComponent,
    LabelListComponent,
    LabelAddComponent,
    WebAddComponent,
    WebEditComponent,
    ArraySortedPipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    NgbModule,
    NgxSummernoteModule
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
