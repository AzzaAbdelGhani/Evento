import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the FollwersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-follwers',
  templateUrl: 'follwers.html',
})
export class FollwersPage {

  arrFollowers = []
 arrUsers = []
  constructor(public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollwersPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.afDatabase.list('/user/'+ data.uid+'/followersArray/').valueChanges().subscribe(
        _data => {
          this.arrFollowers = _data ; 
          console.log(this.arrFollowers) ;
        }
      );

      this.afDatabase.list('/user/').valueChanges().subscribe(
        _data => {
          this.arrUsers = _data ; 
        }
      );
      
       }
  });
  }
  GoToFolls()
{
  this.navCtrl.push(FollwersPage);
}
}
