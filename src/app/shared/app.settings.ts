export class AppSettings {
  SERVICE_URLBASE: string;
  CUSTOM_PATH: string;
  AMBIENTE: string;
  VERSAO: string;

  /**
   *
   */
  constructor() {
    this.SERVICE_URLBASE = 'http://api.wilsondonizetti.eti.br/api';
    this.AMBIENTE = 'Desenvolvimento';
    this.VERSAO = '1.0.0';
    this.CUSTOM_PATH = '';
  }
  /*
  *   Metodo para montar URLS dos sistemas
  *   area     --> area pertencente
  *   controller      --> controller da aplicação
  */
  getURL(area: string, controller: string) {
    if (area !== undefined && area !== '') {
      if (this.CUSTOM_PATH !== undefined && this.CUSTOM_PATH !== '' &&
        (location.origin + this.CUSTOM_PATH) !== (location.origin + '/' + area)) {
        return location.origin + this.CUSTOM_PATH + '/' + area + '/' + controller;
      } else {
        return location.origin + '/' + area + '/' + controller;
      }
    } else {
      if (this.CUSTOM_PATH !== undefined && this.CUSTOM_PATH !== '' &&
        (location.origin + this.CUSTOM_PATH) !== (location.origin + '/' + controller)) {
        return location.origin + this.CUSTOM_PATH + '/' + controller;
      } else {
        return location.origin + '/' + controller;
      }
    }
  };
}
