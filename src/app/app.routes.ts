import { Routes } from '@angular/router';
import { CarUploadPageComponent } from './components/pages/car-upload-page/car-upload-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AttachRoutePageComponent } from './components/pages/attach-route-page/attach-route-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'upload-car',
    component: CarUploadPageComponent,
  },
  {
    path: 'attach-route',
    component: AttachRoutePageComponent
  }
];
