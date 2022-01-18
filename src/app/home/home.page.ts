import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsercardsService } from '../usercards.service';

import { AuthService } from '../auth/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  @ViewChild('lineCanvas', {static: true}) lineCanvas: ElementRef;


  private lineChart: Chart;



  constructor(
    private usercardsService: UsercardsService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController


    ) {}

    ngOnInit() {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['J', 'F', 'M', 'A', 'M', 'Jn', 'Jl', 'A', 'O', 'N', 'D'],
          datasets: [
            {
              label: 'Clients',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40],
              spanGaps: false
            }
          ]
        }
      });
    }

    }

    // ionViewWillEnter() {
    // //   this.isLoading = true;
    // //   this.usercardsService.fetchUserCards().subscribe( () => {
    // //     this.isLoading = false;
    // //   });
    // }
// }



