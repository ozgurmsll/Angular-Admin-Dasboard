import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthResponse } from '../auth-response';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode:boolean=true;
  loading:boolean=false;
  isAdmin:boolean=false;
  isAuthenticated:boolean=false;

  error:string="";
  toastr: any;
  constructor(private authService:AuthService
    ,private router:Router,private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;
      this.isAdmin=user?.email=="xx"})
  }
  toogleMode(){
    this.isLoginMode=!this.isLoginMode;

  }
  handleAuth(form:NgForm){
    if (!form.valid) {
      return;

    }
    this.loading=true;
    const email=form.value.email;
    const password=form.value.password;
    let authResponse:Observable<AuthResponse>

    if(this.isLoginMode){
      authResponse= this.authService.login(email,password)

    }else{
      authResponse=this.authService.register(email,password)
    }
    authResponse.subscribe({

      next: ()=>{
      this.loading=false;
      this.error="";
      this.router.navigate(['/home']);
      },
      error:(err)=>{
      this.loading=false;

        console.log(err);
        this.error = err;
      }


    })
  }
}
