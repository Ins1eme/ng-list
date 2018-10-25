import { Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()

export class AuthService implements OnInit{

  authState: any = null;
  
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.authState = auth;
      }
    })
  }

  ngOnInit() {
    
  }
  
  logOut() {
   return this.afAuth.auth.signOut();
  }

  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  googleAuth() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  githubAuth() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  emailAuth(email:string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  getAuthentification(): boolean {
    return this.authState !== null;
  }

  updateUserData(name?: string): void {
    this.afAuth.authState.subscribe((user) => {
      if(user) {  
        let path = `users/${user.uid}`;
        let data = {
          email: user.email,
          name: name || user.displayName
        }
        this.db.object(path).update(data);
      }
    });
  }

  getUserUID():string {
    if(this.authState) {
      return this.authState.uid;
    }
  }

}