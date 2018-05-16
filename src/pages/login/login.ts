import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

// Facebook native
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public userProv: UsuarioProvider,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private platform: Platform
  ) {}

  signInWithGoogle() {
    this.googlePlus
      .login({
        webClientId:
          '129191174989-qkajpcge6dedbqvcsno1s96ca1qg0lpn.apps.googleusercontent.com',
        offline: true
      })
      .then(res => {
        console.log(JSON.stringify(res));
        firebase
          .auth()
          .signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(res.idToken)
          )
          .then(user => {
            console.log('Firebase success: ' + JSON.stringify(user));

            this.userProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              'google'
            );

            this.navCtrl.setRoot(HomePage);
          })
          .catch(error =>
            console.log('Firebase failure: ' + JSON.stringify(error))
          );
      })
      .catch(err => console.error('Error en el login: ' + JSON.stringify(err)));
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      // Móvil
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          res.authResponse.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(facebookCredential)
          .then(user => {
            console.log(JSON.stringify(user));

            this.userProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              'facebook'
            );

            this.navCtrl.setRoot(HomePage);
          })
          .catch(e => console.log('Error en el login: ' + JSON.stringify(e)));
      });
    } else {
      // Escritorio
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);

          let user = res.user;
          this.userProv.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'facebook'
          );

          this.navCtrl.setRoot(HomePage);
        });
    }
  }
}
