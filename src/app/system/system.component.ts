import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../shared/models/task.model';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit{

  getAuth: boolean = false;
  user: any;
  isShow: boolean = true;
  userUID: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private authService: AuthService, 
    private router: Router, 
    private listService: ListService ) { 

    this.afAuth.authState.subscribe((user) => {
      if(user) {
        this.getAuth = true;
      }
    })
  }

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.userUID = this.authService.getUserUID();
  }

  logOut() {
    this.authService.logOut().then((res) => {
      this.router.navigate(['/login']);
    })
  }

}
