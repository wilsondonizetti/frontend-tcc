import { IUser } from './../iuser';
import { JsonFormatter } from 'tslint/lib/formatters';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

    get isLoggedIn() {
      return this.loggedIn.asObservable(); // {2}
    }

    constructor(
      private router: Router,
      private http: Http
    ) {}

    login(user: IUser) {
      if (user.userName !== '' && user.password !== '' ) { // {3}
        this.http.post('http://api.wilsondonizetti.eti.br/api/account/authenticate', {user: user.userName, password: user.password})
        .subscribe();
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      }
    }

    logout() {                            // {4}
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    }
  }
