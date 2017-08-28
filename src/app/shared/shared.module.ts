import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { LoaderService } from './services/loader.service';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PreloaderComponent],
  exports: [MenuTopComponent, PreloaderComponent],
  providers: [AuthService, AuthGuard, HttpService, LoaderService]
})
export class SharedModule { }
