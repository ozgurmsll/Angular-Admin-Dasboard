import { Component, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AdminGuard implements CanActivate{
  constructor(private authService:AuthService
    ,
    private router:Router
    ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.authService.user.pipe(
      map(user=>{
        return !!user && user.email=="x"
      } ),
      tap((isAdmin)=>{
        if(!isAdmin){
          alert('Yetkiniz yok')
        }


      }),


    );



  }

}
