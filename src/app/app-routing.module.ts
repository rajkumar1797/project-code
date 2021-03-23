import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [

  {path: "",pathMatch: "full",redirectTo: "auth"},

  {path: 'auth',loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},

  {path: "user", component:UserComponent, loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
