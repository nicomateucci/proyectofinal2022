import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../Services/users/user.service';
import { IUser } from '../Models/iuser';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  constructor(
    private templateRef : TemplateRef<any>,
    private viewContainer : ViewContainerRef,
    private userService : UserService
  ) {}

  private rolesUser : Array<string> | null = null;
  private permissions! : Array<string>; 

  ngOnInit(): void {
    this.updateView();
    console.log(this.appRole)
  }
  
  @Input()
  set appRole(permissions : Array<string>){
    console.log(permissions)
    this.permissions = permissions;
    this.updateView();
  }

  private updateView(){
    this.viewContainer.clear();
    if (this.checkPermissions()){
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

  private checkPermissions(): boolean  {
    let hasPermissions = false;
    const user = this.userService.getUser();
    if (!user){
      return hasPermissions;
    }
    for (const permissions of this.permissions){


    }

    return true
  
  }

}
