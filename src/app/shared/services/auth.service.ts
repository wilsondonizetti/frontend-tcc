import { AppSettings } from './../app.settings';
import { TokenModel } from './../models/token-model';
import { HttpService } from './http.service';
import { IUser } from './../iuser';
import { JsonFormatter } from 'tslint/lib/formatters';
import { Http } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private settings: AppSettings;

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private svcHttp: HttpService,
    private zone: NgZone
  ) {
    this.settings = new AppSettings();
  }

  login(user: IUser) {
    if (user.userName !== '' && user.password !== '') { // {3}
      this.svcHttp.post(`${this.settings.SERVICE_URLBASE}/account/authenticate?user=${user.userName}&password=${user.password}`,
        undefined)
        .subscribe((dados: TokenModel) => {
          if (dados.Success) {
            localStorage.setItem('token-tcc', dados.Token);
            this.loggedIn.next(true);
            this.zone.run(() => {
              this.router.navigate(['/']);
              window.location.href = window.location.origin;
            });

            // window.location.replace(window.location.origin);
            // window.location.href = window.location.origin;
          } else {
            this.loggedIn.next(false);
            this.zone.run(() => {
              this.router.navigate(['/login']);
            });
          }
        });

    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    localStorage.setItem('token-tcc', undefined);
    this.zone.run(() => {
      this.router.navigate(['/login']);
    });
  }
}
