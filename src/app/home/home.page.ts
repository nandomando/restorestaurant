import { Component, OnInit } from '@angular/core';
import { UsercardsService } from '../usercards.service';

import { AuthService } from '../auth/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{


  constructor(
    private usercardsService: UsercardsService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController


    ) {}

    ngOnInit() {

    }

    // ionViewWillEnter() {
    //   this.isLoading = true;
    //   this.usercardsService.fetchUserCards().subscribe( () => {
    //     this.isLoading = false;
    //   });
    // }


}

