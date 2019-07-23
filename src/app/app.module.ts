import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { RememberComponent } from './games/remember/remember.component';
import { PlaygroundComponent } from './playground/playground.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MeadowComponent } from './meadow/meadow.component';

//import services and list them in providers


@NgModule({
  declarations: [
    AppComponent,
    RememberComponent,
    PlaygroundComponent,
    LoginComponent,
    RegisterComponent,
    MeadowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
