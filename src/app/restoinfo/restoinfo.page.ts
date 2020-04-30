import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestocardsService } from '../restocards.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';




@Component({
  selector: 'app-restoinfo',
  templateUrl: './restoinfo.page.html',
  styleUrls: ['./restoinfo.page.scss'],
})
export class RestoinfoPage implements OnInit {

  form: FormGroup;



  constructor(
    private restocardsService: RestocardsService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
      address: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
    });
  }

  onCreateRestocard() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Creating Card...'
    }).then(loadingEl => {
      loadingEl.present();
      this.restocardsService.addRestocard(
        this.form.value.name,
        this.form.value.address,
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/', 'tabs', 'tab', 'home']);
      });
    });
  }

}
