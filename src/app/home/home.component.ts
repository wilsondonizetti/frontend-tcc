import { AppSettings } from './../shared/app.settings';
import { HttpService } from './../shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: any[];
  clientes: any[];
  private settings: AppSettings;
  constructor(private svcHttp: HttpService) {
    this.settings = new AppSettings();
  }

  ngOnInit() {}

  buscarProdutos() {
    this.svcHttp
      .get(`${this.settings.SERVICE_URLBASE}/produto/list`, {
        headers: new Headers({
          Token: localStorage.getItem('token-tcc'),
          'Content-Type': 'application/json'
        })
      })
      .subscribe((dados: any) => {
        this.produtos = dados;
      });
  }

  buscarClientes() {
    this.svcHttp
      .get(`${this.settings.SERVICE_URLBASE}/cliente/list`, {
        headers: new Headers({
          Token: localStorage.getItem('token-tcc'),
          'Content-Type': 'application/json'
        })
      })
      .subscribe((dados: any) => {
        this.clientes = dados;
      });
  }
}
