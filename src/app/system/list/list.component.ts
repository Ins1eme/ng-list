import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from '../../shared/models/task.model';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  @ViewChild(MatSort) sort: MatSort;
  lists: Task[];
  userUID: string;
  displayedColumns: string[] = ['index', 'name', 'descr', 'date', 'actions'];
  dataSource: MatTableDataSource<Task>;
  
  constructor(
    private authService: AuthService, 
    private listService: ListService,
    public dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.userUID = this.authService.getUserUID();
    this.listService.getList(this.userUID).subscribe((list) => {
      this.lists = list;
      this.dataSource = new MatTableDataSource(this.lists);
      this.dataSource.sort = this.sort;
    })
  }
  
  openDialogCreateTask(): void {
    this.dialog.open(CreateTaskComponent, {
      width: '50%'
    });
  }

  openDialogEditTask(event,task: Task) {
    this.dialog.open(UpdateTaskComponent, {
      data: task
    });
    event.stopPropagation();
  }

  deleteTask(event,taskId:number) {
    this.listService.deleteTask(taskId, this.userUID);
    event.stopPropagation();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeTaskState(task: Task) {
    task.complete = !task.complete;
    this.listService.updateTask(task, this.userUID)
  }
}
