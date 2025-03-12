import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from './environments/environment';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

const apiUrlInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiReq = req.url.startsWith('/api')
    ? req.clone({ url: `${environment.apiUrl}${req.url}` })
    : req;

  return next(apiReq);
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptors([apiUrlInterceptor]))
  ]
}).catch((err) => console.error(err));