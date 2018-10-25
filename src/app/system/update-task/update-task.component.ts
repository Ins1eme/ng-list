import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { Task } from '../../shared/models/task.model';
import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  userUID: string;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    public authService: AuthService,
    public listService: ListService
  ) { }

  ngOnInit() {
    this.userUID = this.authService.getUserUID();
    this.form = new FormGroup({
      name: new FormControl(this.task.name),
      descr: new FormControl(this.task.descr)
    })
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const task = new Task(this.form.value.name, this.form.value.descr, new Date().toString(), this.task.complete, this.task.id);
    this.dialogRef.close();
    this.listService.updateTask(task, this.userUID);
  }
}
