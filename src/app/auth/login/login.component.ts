import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  authWithGoogle() {
    this.authService.googleAuth().then((res) => {
      this.authService.updateUserData();
      this.router.navigate(['system']);
    }).catch((error) => {
      console.log(error);
    })
  }

  authWithGithub() {
    this.authService.githubAuth().then((res) => {
      this.router.navigate(['system']);
      this.authService.updateUserData();
    }).catch((error) => {
      console.log(error);
    })
  }

}
