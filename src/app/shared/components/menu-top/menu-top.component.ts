import { AppSettings } from './../../app.settings';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit, OnDestroy {
  settings: AppSettings = new AppSettings();
  isAutheticated: boolean;
  constructor(
    private svcAuth: AuthService,
    private svcHttp: HttpService
  ) {
  }

  ngOnInit() {
    this.svcAuth.isLoggedIn.subscribe((c: boolean) => this.isAutheticated = c);
  }

  ngOnDestroy() {

  }

  logout() {
    this.svcAuth.logout();
  }
}
