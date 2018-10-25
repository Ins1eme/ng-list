import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  message: Message;
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }
  
  private showMessage(type, text) {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.type = 'none'
    },4000);
  }
  

  onSubmit() {
    const name = this.form.value.name.slice(0,1).toUpperCase() + this.form.value.name.slice(1);
    const url = 'http://www.dffc.eu/wp-content/uploads/2014/07/anonym2.png';
    this.authService.emailAuth(this.form.value.email, this.form.value.password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name,
          photoURL: url
        })
        this.authService.updateUserData(this.form.value.name);
        this.router.navigate(['system']);
      })
      .catch((error) => {
        this.showMessage('warning', error.message);
      })
  }
}
