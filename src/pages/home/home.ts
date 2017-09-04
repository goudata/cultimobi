import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Profile } from "../../models/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, private toast: ToastController) {
    // if(!this.isLoggedIn()){
    //   this.navCtrl.push(LoginPage);
    // }
  }

  isLoggedIn() {
    // if(window.localStorage.getItem('currentUser')){
    //   this.data = JSON.parse(localStorage.getItem('currentUser'));
    //   return true;
    // }
  }

  ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      if(data.email){
        this.toast.create({
          message: `Welcome back,` + data.email,
          duration: 3000
        })

        this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      } else {
        this.toast.create({
          message: `User not found`,
          duration: 3000
        })
      }
    })
  }

}
