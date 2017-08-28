import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderService {
  isLoading = new EventEmitter<boolean>();
  show() {
    this.isLoading.emit(true);
  }
  hide() {
    this.isLoading.emit(false);
  }
  constructor() {
    this.isLoading.emit(false);
  }

}
