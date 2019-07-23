import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RememberComponent } from './games/remember/remember.component';
import { PlaygroundComponent } from './playground/playground.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MeadowComponent } from './meadow/meadow.component';

const routes: Routes = [
  { path : '', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'meadow', component: MeadowComponent },
  { path : 'playground', component: PlaygroundComponent, children : [
      { path : 'remember', component : RememberComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
