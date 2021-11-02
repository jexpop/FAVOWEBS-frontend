// IMPORTS NECESARIOS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTAR COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { WebListComponent } from './components/web-list/web-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelAddComponent } from './components/label-add/label-add.component';
import { WebAddComponent } from './components/web-add/web-add.component';
import { WebEditComponent } from './components/web-edit/web-edit.component';

import { IdentityGuard } from './services/identity.guard';

// DEFINIR RUTAS
const appRoutes: Routes = [
	{path: '', component: WebListComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'mis-favoritos', component: WebListComponent, canActivate: [IdentityGuard]},	
	{path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard]},
	{path: 'ver-etiquetas', component: LabelListComponent, canActivate: [IdentityGuard]},
	{path: 'crear-etiqueta', component: LabelAddComponent, canActivate: [IdentityGuard]},
	{path: 'crear-web', component: WebAddComponent, canActivate: [IdentityGuard]},
	{path: 'editar-web/:id', component: WebEditComponent, canActivate: [IdentityGuard]},
	{path: 'perfil/:id', component: ProfileComponent},
	{path: 'error', component: ErrorComponent},
	{path: '**', component: ErrorComponent}
];

// EXPORTAR CONFIGURACIÓN
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);