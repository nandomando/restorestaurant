import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestocardsService } from '../restocards.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}



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
      photo: new FormControl(null)
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
      this.restocardsService.uploadImage(this.form.get('photo').value)
      .pipe(
        switchMap( uploadRes => {
          return this.restocardsService.addRestocard(
            this.form.value.name,
            this.form.value.address,
            uploadRes.imageUrl
          );
        })
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/', 'tabs', 'tab', 'home']);
      });
    });
  }


  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/png;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    console.log('the end of onImagePicked');
    console.log(imageFile);
    this.form.patchValue({ photo: imageFile });
  }

}
