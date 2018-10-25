import { NgModule } from "@angular/core";
import { SystemComponent } from "./system.component";
import { ListComponent } from "./list/list.component";
import { AuthService } from "../services/auth.service";
import { SystemRoutingModule } from "./system-routing.module";
import { MatButtonModule,MatSortModule,MatTableModule,MatListModule,MatIconModule,MatToolbarModule,MatSidenavModule,MatInputModule,MatDialogModule } from '@angular/material';
import { CommonModule } from "@angular/common";
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SliceDirective } from "../shared/directives/slice.directive";
@NgModule({
    declarations: [
        SystemComponent,
        ListComponent,
        CreateTaskComponent,
        UpdateTaskComponent,
        SliceDirective
    ],
    imports: [
        SystemRoutingModule,
        CommonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatSortModule,
        MatDialogModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule
    ],
    entryComponents: [
        CreateTaskComponent,
        UpdateTaskComponent
    ],
    providers: [
        AuthService
    ]
})

export class SystemModule {

}