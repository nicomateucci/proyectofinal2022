//------------------------------------MODULOS------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { YouTubePlayerModule } from '@angular/youtube-player';
//------------------------------------MODULOS------------------------------------

//------------------------------------MODULOS CUSTOM------------------------------------
import { UiComponentsModule } from './UI-Componets/ui-components.module';
import { AssetsModule } from './UI-Pages/assets/assets.module';
import { CoursesModule } from './UI-Pages/courses/courses.module';
//------------------------------------MODULOS CUSTOM------------------------------------

//------------------------------------COMPONENTES------------------------------------
import { AppComponent } from './app.component';
import { ProfileComponent } from './UI-Pages/profile/profile.component';
//------------------------------------COMPONENTES------------------------------------

//------------------------------------DIRECTIVAS------------------------------------
import { RoleDirective } from './Directives/role.directive';

//------------------------------------DIRECTIVAS------------------------------------

//------------------------------------PIPES------------------------------------
//Declaracion de pipes custom
//------------------------------------PIPES------------------------------------

import { authTokeninterceptorProvider } from './Interceptors/jwt.interceptor';
import { NavbarModule } from './UI-Componets/navbar/navbar.module';

import { Auth0Credentials } from '../environments/Auth0';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RoleDirective
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 3000,
      maxOpened: 1,
      preventDuplicates: true
    }),
    UiComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AssetsModule,
    CoursesModule,
    AppRoutingModule,
    YouTubePlayerModule,
    NavbarModule,
    AuthModule.forRoot({
      //CAMBIAR DATOS DE M2M, API Y SPA
      domain: Auth0Credentials.domain,
      clientId: Auth0Credentials.clientID,
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
      //M2MClientId: "dHdo47orvAJbxMVTjCOLyJfHNxjczzlM",
      //M2MClientSecret : "CAjDQePWm49SZX1fAYBZ2LLKHnOLFWEtRW3R9fAHDmT0iUyhVIEwDVcshpGETjm_"
    }),

    BrowserAnimationsModule,
  ],
  providers: [
    authTokeninterceptorProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
