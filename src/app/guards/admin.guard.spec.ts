import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
// import { map, Observable, tap } from "rxjs";
// import { environment } from "src/environments/environment.prod";
// import { User } from "../loginpage/user";
// import { LoginpageService } from "../services/loginpage.service";

// @Injectable({ providedIn: 'root'})
// export class AdminGuard implements CanActivate {
//     constructor (

//         private loginpageservice: LoginpageService,
//         private router: Router
//         ){}
//         canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

//           return this.loginpageservice.user.pipe(
//             map(user=>{
//               return !!user && user.email=="xiremugurlu.27@gmail.com"
//             } ),
//             tap((isAdmin)=>{
//               if(!isAdmin){
//                 this.router.navigate(["/home"]);
//                 alert('Yetkiniz yok')
//               }


//             }),


//           );



//         }

// }
