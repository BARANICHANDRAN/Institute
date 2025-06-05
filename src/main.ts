import { bootstrapApplication } from '@angular/platform-browser';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';
<<<<<<< HEAD

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
=======

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
=======
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
