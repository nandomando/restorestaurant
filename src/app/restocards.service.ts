import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restocard } from './restocard.model';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';



interface CardFetch {
  photo: string;
  name: string;
  address: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestocardsService {

  private _restocards = new BehaviorSubject<Restocard[]>([]);

  get restocards() {
    return this._restocards.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  fetchCards() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(switchMap(userId => {
      if (!userId) {
        throw new Error('User not found!');
      }
      fetchedUserId = userId;
      return this.authService.token;
    }),
    take(1),
    switchMap(token => {
      return this.http
      .get<{[key: string]: CardFetch}>(
        `https://restorestaurant-5f11f.firebaseio.com/restocards.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
      );
    }),
    map(resData => {
      const Cardarr = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          Cardarr.push(new Restocard(
            key,
            resData[key].photo,
            resData[key].name,
            resData[key].address,
            resData[key].userId,
            )
          );
        }
      }
      return Cardarr;
    }),
    tap(restocards => {
      this._restocards.next(restocards);
    })
    );
  }

  addRestocard(
    name: string,
    address: string,
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newRestocard: Restocard;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
    switchMap(token => {
      if (!fetchedUserId) {
        throw new Error('No user found');
      }
      newRestocard = new Restocard(
        Math.random().toString(),
        'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        name,
        address,
        fetchedUserId
      );
      return this.http
      .post<{name: string}>(`https://restorestaurant-5f11f.firebaseio.com/restocards.json?auth=${token}`,
        { ...newRestocard, id: null});
    }),
      switchMap( resData => {
        generatedId = resData.name;
        return this.restocards;
      }),
      take(1),
      tap(restocards => {
        newRestocard.id = generatedId;
        this._restocards.next(restocards.concat(newRestocard));
      })
      );
  }


}
