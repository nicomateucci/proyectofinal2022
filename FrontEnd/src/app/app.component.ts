import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hideNavbar = false;
  hideFooter = false;

  title = 'FinanSys';

  constructor(
    private router: Router
  ) { 
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe( () =>{
      if (this.router.url.includes('login')){
        this.hideFooter = true;
        this.hideNavbar = true;
      } else{
        this.hideFooter = false;
        this.hideNavbar = false;
      }
    })
  }

}
