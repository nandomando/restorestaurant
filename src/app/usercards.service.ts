import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Usercard } from './usercard.model';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';

interface UserCardFetch {
  id: string;
  photo: string;
  name: string;
  address: string;
  points: number;
  freemeal: number;
  restoId: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsercardsService {


  private _usercards = new BehaviorSubject<Usercard[]>([]);

  private _useronlyrestocards = new BehaviorSubject<Usercard[]>([]);

  get useronlyrestocards() {
    return this._useronlyrestocards.asObservable();
  }

  get usercards() {
    return this._usercards.asObservable();
  }

  allcards: Usercard[];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }



  fetchOnlyUsercartas(id: string) {
    return this.http.get<{ [key: string]: UserCardFetch }>(
      `https://resto-57119.firebaseio.com/usercards.json?`
    ).subscribe(resData => {
      const usercards = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key) && resData[key].userId === id) {
          usercards.push(
            new Usercard(
              key,
              resData[key].photo,
              resData[key].name,
              resData[key].address,
              resData[key].points,
              resData[key].freemeal,
              resData[key].restoId,
              resData[key].userId,
            )
          );
        }
      }
      this._useronlyrestocards.next(usercards);
    });
  }

  fetchUserCardsoriginal() {
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
      .get<{[key: string]: UserCardFetch}>(
        `https://resto-57119.firebaseio.com/usercards.json?`
      );
    }),
    map(resData => {
      const Usercardarr = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          Usercardarr.push(new Usercard(
            key,
            resData[key].photo,
            resData[key].name,
            resData[key].address,
            resData[key].points,
            resData[key].freemeal,
            resData[key].restoId,
            resData[key].userId,
            )
          );
        }
      }
      return Usercardarr;
    }),
    tap(usercards => {
      this._usercards.next(usercards);
    })
    );
  }

  updateCard(
    cardId: string,
    points: number,
    freemeal: number,
  ) {
    let updatedusercards: Usercard[];
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        fetchedToken = token;
        return this.usercards;
      }),
      take(1),
      switchMap(exercises => {
        if (!exercises || exercises.length <= 0) {
          return this.fetchUserCardsoriginal();
        } else {
          return of(exercises);
        }
      }),
      switchMap(exercises => {
          const updatedExerciseIndex = exercises.findIndex(ex => ex.id === cardId);
          updatedusercards = [...exercises];
          const oldExe = updatedusercards[updatedExerciseIndex];
          updatedusercards[updatedExerciseIndex] = new Usercard(
            oldExe.id,
            oldExe.photo,
            oldExe.name,
            oldExe.address,
            points,
            freemeal,
            oldExe.restoId,
            oldExe.userId
          );
          console.log(oldExe);
          return  this.http.put(`https://resto-57119.firebaseio.com/usercards/${cardId}.json?`,
            { ...updatedusercards[updatedExerciseIndex], id: null }
          );
      }), tap(() => {
        this._usercards.next(updatedusercards);
        console.log(updatedusercards);
      })
      );
    }

}
