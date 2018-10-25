import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {
  
  form: FormGroup;
  message: Message;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  private showMessage(type, text) {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.type = 'none'
    },4000);
  }
  onSubmit() {
    this.authService.signIn(this.form.value.email, this.form.value.password).then((user) => {
      this.router.navigate(['system']);
    }).catch((error) => {
      this.showMessage('warning', error.message);
    })
  }


}
