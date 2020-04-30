import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { UsercardsService } from '../usercards.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  scannedCode = null;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private usercardsService: UsercardsService,
    private router: Router,

    ) { }

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    });
  }

  log() {
    this.usercardsService.fetchOnlyUsercartas('aQN0au2b6lcuCz4eVdIeCqfNQvI2');
    this.router.navigate(['/tabs/tab/edit']);

  }

}
