import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Userinfo } from './userinfo.model';
import { HttpClient } from '@angular/common/http';


import { LoadingController } from '@ionic/angular';

interface UserData {
  id: string;
  photo: string;
  name: string;
  email: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {



  private _usersInfo = new BehaviorSubject<Userinfo[]>([]);

  get usersinfo() {
    return this._usersInfo.asObservable();
  }

  constructor(

    private loadingCtrl: LoadingController,
    private http: HttpClient,

  ) { }



  fetchOnlyUserinfo(id: string) {
    return this.http.get<{ [key: string]: UserData }>(
      `https://resto-57119.firebaseio.com/usersinfo.json?`
    ).subscribe(resData => {
      console.log('resdata de fetchonlyuserinfo',resData);
      const userinfoarr = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key) && resData[key].userId === id) {
          userinfoarr.push(
            new Userinfo(
              key,
              resData[key].photo,
              resData[key].name,
              resData[key].email,
              resData[key].userId,
            )
          );
        }
      }
      console.log('userinfoarray from fetchonlyuserinfo:',userinfoarr);
      this._usersInfo.next(userinfoarr);
    });
  }

  // fetchUserInfo() {
  //       return this.http.get<{ [key: string]: UserData}>(
  //         `https://resto-57119.firebaseio.com/usersinfo.json?`
  //       ).subscribe(resData => {
  //        const userinfoarr = [];
  //        for (const key in resData) {
  //       if (resData.hasOwnProperty(key)) {
  //         userinfoarr.push(
  //           new Userinfo(
  //           key,
  //           resData[key].photo,
  //           resData[key].name,
  //           resData[key].email,
  //           resData[key].userId,
  //           )
  //         );
  //       }
  //     }
  //        this._usersInfo.next(userinfoarr);
  //   });
  // }



}
