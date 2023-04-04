//------------------------------------MODULOS------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
//------------------------------------MODULOS------------------------------------

//------------------------------------MODULOS CUSTOM------------------------------------
import { UtilitiesModule } from './utilities/utilities.module';
import { AssetsModule } from './assets/assets.module';
import { CoursesModule } from './courses/courses.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
//------------------------------------MODULOS CUSTOM------------------------------------

//------------------------------------COMPONENTES------------------------------------
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//------------------------------------COMPONENTES------------------------------------

//------------------------------------PIPES------------------------------------
//Declaracion de pipes custom
//------------------------------------PIPES------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    ToastrModule.forRoot({/* ACA VAN LOS CAMBIOS GLOBALES*/ }),
    ReactiveFormsModule,
    AngularMaterialModule,
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
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
