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
  private settings: AppSettings;
  constructor(
    private svcHttp: HttpService
  ) {
    this.settings = new AppSettings();
  }

  ngOnInit() {
  }

  buscarProdutos() {

    this.svcHttp.get(`${this.settings.SERVICE_URLBASE}/produto/list`, {
      headers: new Headers({ Token: localStorage.getItem('token-tcc'),
      'Content-Type': 'application/json' })
    }).subscribe((dados: any) => {
      console.log(dados);
      this.produtos = dados;
    });
    console.log('teste');
  }

}
