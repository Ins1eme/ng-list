import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { Task } from "../shared/models/task.model";

@Injectable()

export class ListService{
    
    constructor(private authService: AuthService, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

    getList(userUID: string): Observable<any[]> {
        return this.db.list(`/users/${userUID}/list`).valueChanges();
    }

    createTask(task: Task, userUID: string) {
        const path = `users/${userUID}/list/task_${task.id}`;
        return this.db.object(path).set(task)
    }

    updateTask(task: Task, userUID: string) {
        const path = `users/${userUID}/list/task_${task.id}`;
        return this.db.object(path).update(task)
    }


    deleteTask(taskId: number, userUID: string) {
        const path = `users/${userUID}/list/task_${taskId}`;
        return this.db.object(path).remove();
    }
}