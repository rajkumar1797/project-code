import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: UserListComponent },
  { path: 'add', component:UserCreateEditComponent},
  { path: 'edit/:id', component:UserCreateEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
