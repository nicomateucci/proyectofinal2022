//------------------------------------MODULOS------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UtilitiesModule } from './utilities/utilities.module';
import { AssetsModule } from './assets/assets.module';
import { CoursesModule } from './courses/courses.module';
//------------------------------------MODULOS------------------------------------

//------------------------------------COMPONENTES------------------------------------
import { AppComponent } from './app.component';
//------------------------------------COMPONENTES------------------------------------

//------------------------------------RUTAS------------------------------------
import { ProfileComponent } from './routes/profile/profile.component';
import { HomeComponent } from './routes/home/home.component';
import { CarouselModule } from '@coreui/angular';
//------------------------------------RUTAS------------------------------------

//------------------------------------PIPES------------------------------------
//------------------------------------PIPES------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    CarouselModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserModule,
    UtilitiesModule,
    AssetsModule,
    CoursesModule,
    AppRoutingModule,
    AuthModule.forRoot({
      //CAMBIAR DATOS DE M2M, API Y SPA
      domain: "dev-3h2tiekd.us.auth0.com",
      clientId: "VxudccHi4sMvsN1cGIKLNSdaG0B2bZpT",
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
      //M2MClientId: "dHdo47orvAJbxMVTjCOLyJfHNxjczzlM",
      //M2MClientSecret : "CAjDQePWm49SZX1fAYBZ2LLKHnOLFWEtRW3R9fAHDmT0iUyhVIEwDVcshpGETjm_"
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
