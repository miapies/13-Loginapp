import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: Credenciales = {};

  constructor(
    public navCtrl: NavController,
    public userProv: UsuarioProvider,
    private afAuth: AngularFireAuth
  ) {
    this.user = this.userProv.usuario;

    this.afAuth.authState.subscribe(user => {
      console.log('AFAUTH!!!');
      console.log(JSON.stringify(user));
    });
  }

  salir() {
    this.afAuth.auth.signOut().then(res => {
      this.userProv.usuario = {};
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
