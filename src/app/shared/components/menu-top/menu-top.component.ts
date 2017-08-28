import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { TS } from 'typescript-linq/TS';

import { NotificationSr } from './../../models/notification-Sr';
import { MessageSr } from './../../models/message-Sr';

import { AuthService } from './../../services/auth.service';
import { AppSettings } from './../../../settings/app.settings';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  settings: AppSettings = new AppSettings();

  LstNotifications: TS.Collections.List<NotificationSr> = new TS.Collections.List<NotificationSr>(true);
  LstMessages: TS.Collections.List<MessageSr> = new TS.Collections.List<MessageSr>(true);

  // Total Geral de notificações
  TotalNotifications = 0;
  // Total Geral de mensagens
  TotalMessages = 0;
  TitleNotifications = 'Ver todas notificações';
  TitleMessages = 'Ver todas mensagens';

  // self.rtc = ko.observable();

  // self.rtc.subscribe(function () {
  //   if (self.rtc()) {
  //     self.rtc().client.getMessages.subscribe(function () {
  //       self.carregarMensagens();
  //     });

  //     self.rtc().client.getNotifications.subscribe(function () {
  //       self.carregarNotificacoes();
  //     });

  //     self.rtc().client.showMessageToClient.subscribe(function (data) {
  //       toastr.warning(data.message, data.title, { "positionClass": "toast-bottom-left", "showDuration": data.timeout.toString(), "closeButton": true, });
  //     });
  //   }
  // });

  CssMessages = function () {
    if (this.TotalMessages === 0) {
      return 'fa fa-comments';
    }

    return 'fa fa-comments faa-tada animated';
  };

  CssNotifications = function () {
    if (this.TotalNotifications === 0) {
      return 'fa fa-bell';
    }
    return 'fa fa-bell faa-ring animated';
  };

  CssMessagesText = function () {
    if (this.TotalMessages === 0) {
      return 'count count-messages';
    }
    return 'count count-messages circle-msg-red';
  };

  CssNotificationsText = function () {
    if (this.TotalNotifications === 0) {
      return 'count count-notifications';
    }
    return 'count count-notifications circle-msg-red';
  };

  AddNotification(id, tipo, title, message) {
    const notifi = new NotificationSr(id, tipo, title, message);

    this.LstNotifications.add(notifi);
  };

  AddMessage(id, from, title, message, frozen) {

    const msg = new MessageSr(from, title, message, id, frozen);

    this.LstMessages.add(msg);
  }

  RefreshNotifications(notifications) {
    this.LstNotifications = new TS.Collections.List<NotificationSr>(true);

    notifications.forEach(function (item) {
      this.AddNotificatio(item.Id, item.Type, item.Title, item.Message);
    });
  }

  RefreshMessages(messages) {
    this.LstMessages = new TS.Collections.List<MessageSr>(true);

    messages.forEach(function (item) {
      this.AddMessage(item.Id, item.From, item.Title, item.Message, false);
    });
  }

  // if(model && model.rtc)
  // self.rtc(model.rtc);

  carregarNotificacoes(): Observable<any> {
    const url = `${this.settings.SERVICE_URLBASE}/Notificacao`;
    return this.svcHttp.get(url)
      .map((dados: any) => {
        console.log('notificações');
        console.log(dados);
        dados.LstData.forEach(element => {
          element = new NotificationSr(element.ID, element.Tipo, element.Titulo, element.Descricao);
          return element;
        });

        // Fcm.Base.setCookie('TotalNotifications', data.TotalRows);


        return dados;
      });
  };

  carregarMensagens(): Observable<any> {
    const url = `${this.settings.SERVICE_URLBASE}/Mensagem`;
    return this.svcHttp.get(url)
      .map((dados: any) => {
        dados.LstData.forEach(element => {
          element = new MessageSr(element.De, element.Titulo, element.Descricao, element.ID, false);
          return element;
        });

        return dados;
      });
  };


  constructor(
    private svcAuth: AuthService,
    private svcHttp: HttpService
  ) {
  }

  isAutheticated(): boolean {
    return this.svcAuth.isLoggedIn;
  }

  ngOnInit() {
    this.carregarNotificacoes().subscribe(dados => {
      console.log('not');
      console.log(dados);
      this.TotalMessages = dados.TotalRows;
      this.RefreshMessages(dados);
    });
    this.carregarMensagens().subscribe(dados => {
      console.log('msg');
      console.log(dados);
      this.TotalMessages = dados.TotalRows;
      this.RefreshMessages(dados);
    });
  }

}
