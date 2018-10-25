import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthComponent } from "./auth.component";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "../services/auth.service";
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule, MatInputModule } from "@angular/material";

import { LoginEmailComponent } from './login-email/login-email.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent,
        LoginEmailComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService
    ]
}) 

export class AuthModule {

}