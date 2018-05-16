import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { UsuarioProvider } from '../providers/usuario/usuario';

// Firebase
import { AngularFireModule } from 'angularfire2';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Plugins
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

export const firebaseConfig = {
  apiKey: 'AIzaSyATFqTYu7BM4FMS8UZRPxTUfEiHhbRzaz0',
  authDomain: 'loginapp-a4cde.firebaseapp.com',
  databaseURL: 'https://loginapp-a4cde.firebaseio.com',
  projectId: 'loginapp-a4cde',
  storageBucket: 'loginapp-a4cde.appspot.com',
  messagingSenderId: '129191174989'
};

@NgModule({
  declarations: [MyApp, HomePage, LoginPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, LoginPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireDatabase,
    UsuarioProvider,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
