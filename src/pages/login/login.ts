import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { HomePage } from '../../pages/home/home';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  loading: any;
  public data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth) {
  }

  async login(user: User) {
    this.showLoader();

    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password); 
      if(result){
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }
    } catch (error) {
      this.loading.dismiss();
      this.presentToast(error.message)
    }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
