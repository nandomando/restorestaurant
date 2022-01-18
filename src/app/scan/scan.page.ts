import { Component, OnInit } from '@angular/core';
import { UsercardsService } from '../usercards.service';
import { Router } from '@angular/router';

// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { UserinfoService } from '../userinfo.service';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  isLoading =  false;
  idcurrentusercard = null;
  constructor(
    private usercardsService: UsercardsService,
    private userinfoService: UserinfoService,
    private router: Router,
    private barcodeScanner: BarcodeScanner

    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.idcurrentusercard = barcodeData;
      let result = barcodeData.toString();
      console.log('qr code result:',result);
      this.navigator(result);
     }).catch(err => {
         console.log('Error', err);
     });
    // this.navigator('PtbAL3IZaqSOBeHSezsLFADYX7u2');
    this.isLoading = false;
  }


  navigator(id) {
    this.usercardsService.fetchOnlyUsercartas(id);
    this.userinfoService.fetchOnlyUserinfo(id);
    this.router.navigate(['/tabs/tab/edit']);
  }

  log() {
    this.navigator('7iaz0spQN7RQOi6zeVnOsJUtRNb2');
  }

}
