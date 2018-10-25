import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {MatDialogRef} from '@angular/material';
import { Task } from '../../shared/models/task.model';
import { ListService } from '../../services/list.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  userUID: string;
  form: FormGroup;
  taskId: any;
  data: any;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>, 
    private listService: ListService, 
    private authService: AuthService) {
   }

  ngOnInit() {
    this.userUID = this.authService.getUserUID();
    this.form = new FormGroup({
      name: new FormControl(''),
      descr: new FormControl('')
    })
    
    
    this.listService.getList(this.userUID).subscribe((data) => {
      if(data.length) {
        this.taskId = data.map((task) => {
          if(task) {
            return task.id 
          }
        });
      } else {
        this.taskId = [0];
      }
      this.taskId = Math.max(...this.taskId)
    })
  }
  closePopup(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const task = new Task(this.form.value.name, this.form.value.descr, new Date().toString(), false, ++this.taskId);
    this.dialogRef.close();
    this.listService.createTask(task, this.userUID);
  }


}
