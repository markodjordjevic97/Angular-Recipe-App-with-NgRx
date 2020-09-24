import {NgModule} from "@angular/core";
import {GalleryService} from "./hero-page/gallery.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {authInterceptorService} from "./auth/auth-interceptor.service";


@NgModule({
  providers: [
    GalleryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptorService,
      multi: true
    }]
})

export class CoreModule {

}
