import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { HeaderComponent } from './skeleton/header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeaderComponent],

})
export class AppComponent {
  title = 'admindashboard';
  constructor(private elementRef: ElementRef,  public  _router: Router,private authService:AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
