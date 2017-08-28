import { LoaderService } from './../../services/loader.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit, OnDestroy {

  loader: boolean;
  constructor(private svcLoader: LoaderService) { }

  ngOnInit() {
    this.svcLoader.isLoading.subscribe(value => {
      this.loader = value;
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.svcLoader.isLoading.unsubscribe();
  }
}
