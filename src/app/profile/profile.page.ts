import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Restocard } from '../restocard.model';
import { Subscription } from 'rxjs';

import { RestocardsService } from '../restocards.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  isLoading = false;
  loadedRestocards: Restocard[];
  private restocardDestroySub: Subscription;

  constructor(
    private authService: AuthService,
    private restocardService: RestocardsService,

    ) { }

  ngOnInit() {
    this.restocardService.fetchCards();
    this.restocardDestroySub = this.restocardService.restocards.subscribe(elements => {
      this.loadedRestocards = elements;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.restocardService.fetchCards().subscribe( () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.restocardDestroySub) {
      this.restocardDestroySub.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
  }

}
