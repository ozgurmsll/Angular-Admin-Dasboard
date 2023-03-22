import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private register: AuthService
  ) {
    const data = this.register.getItem('user');
    const dataObject = JSON.parse(data ?? '{}');
    this.name = dataObject.email;

  }
  ngOnInit(

  ): void {
    this.register.autoLogin();

    this.register.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.email == 'alptekinulubay@samsunpark.com';
    });

  }
  name: string | undefined = '';

  logout() {
    this.register.logout();
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
