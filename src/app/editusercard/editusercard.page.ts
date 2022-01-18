import { Component, OnInit } from '@angular/core';

import { UsercardsService } from '../usercards.service';
import { UserinfoService } from '../userinfo.service';

import { Userinfo } from '../userinfo.model';

import { Usercard } from '../usercard.model';
import { AuthService } from '../auth/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editusercard',
  templateUrl: './editusercard.page.html',
  styleUrls: ['./editusercard.page.scss'],
})
export class EditusercardPage implements OnInit {


  loadeduseronlyrestocards: Usercard[];
  loadedcurrentuserinfo: Userinfo[];
  currentUserCard: Usercard[];
  isLoading = false;
  uId = null;
  userId = this.authService.userId.subscribe(data => {
    this.uId = data;
  });

  useronlyrestocards = this.usercardsService.useronlyrestocards.subscribe(cards => {
    this.loadeduseronlyrestocards = cards;
  });


  currentuserinfoSub = this.userinfoService.usersinfo.subscribe(userinfo => {
    this.loadedcurrentuserinfo = userinfo;
    });






constructor(
    private usercardsService: UsercardsService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private userinfoService: UserinfoService,

  ) { }


ngOnInit() {
  this.isLoading = true;
  if (this.userinfoService.fetchOnlyUserinfo) {
    this.isLoading = false;
  }
}

redirect() {
    this.router.navigate(['/tabs/tab/home']);
  }

getcurrentusercard() {
    let currentuser: Usercard;
    for (const element of this.loadeduseronlyrestocards) {
      // console.log(this.loadeduseronlyrestocards);
      if (element.restoId === this.uId) {
        currentuser = new Usercard(
          element.id,
          element.imageUrl,
          element.name,
          element.address,
          element.points,
          element.freemeal,
          element.restoId,
          element.userId
        );
      }
    }
    // console.log('currentuser:',this.currentuser);
    return currentuser;
  }


currentusercardpoints() {
  let userpoints: number;
  const currentusercard = this.getcurrentusercard();
  userpoints = currentusercard.points
  console.log('userpoints:', userpoints);
  return userpoints;
}

addcardpoints() {
    let id: string;
    let points: number;
    let freemeal: number;
    const currentcarduser = this.getcurrentusercard();
    id = currentcarduser.id;
    points = currentcarduser.points;
    freemeal = currentcarduser.freemeal;
    if (!id) {
        this.alertCtrl.create({
          header: 'Card not found!',
          message: 'Please add our fidelity card',
          buttons: ['Okay']
        }).then(alertEl => alertEl.present());
        this.router.navigate(['/tabs/tab/home']);
        return;
      }
    if (points < 11) {
      points ++;
    }
    if (points === 10) {
      points = 0;
      freemeal ++;
    }
    this.loadingCtrl.create({
      message: 'giving points...'
    }).then(loadingEl => {
      loadingEl.present();
      this.usercardsService.updateCard(id, points, freemeal).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigate(['/tabs/tab/home']);
      });
    });
  }

deletefreemeals() {
    let id: string;
    let points: number;
    let freemeal: number;
    const currentcarduser = this.getcurrentusercard();
    id = currentcarduser.id;
    points = currentcarduser.points;
    freemeal = currentcarduser.freemeal;
    if (!id) {
        this.alertCtrl.create({
          header: 'Card not found!',
          message: 'Please add our fidelity card',
          buttons: ['Okay']
        }).then(alertEl => alertEl.present());
        this.router.navigate(['/tabs/tab/home']);
        return;
      }
    if (freemeal > 0) {
      freemeal --;
    }
    this.loadingCtrl.create({
      message: 'giving points...'
    }).then(loadingEl => {
      loadingEl.present();
      this.usercardsService.updateCard(id, points, freemeal).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigate(['/tabs/tab/home']);
      });
    });
  }

}
