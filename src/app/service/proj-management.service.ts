import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../modal/user';
import { Project } from '../modal/project';
import { Task } from '../modal/task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjManagementService {

  baseUrl: string;
  userUrl: string;
  projectUrl: string;
  taskUrl: string;
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept');
    this.options = new RequestOptions({ headers: this.headers });

    this.baseUrl = "http://localhost:8080/projectManagement/";
    this.userUrl = this.baseUrl + "user/";
    this.projectUrl = this.baseUrl + "project/";
    this.taskUrl = this.baseUrl + "task/";
  }

  addUser(user: User): Observable<Response> {
    return this.http.post(this.userUrl + "create", JSON.stringify(user), this.options).pipe(
      map((response: Response) => response)
    );
  }

  editUser(user: User): Observable<Response> {
    return this.http.put(this.userUrl + "update", JSON.stringify(user), this.options).pipe(
      map((response: Response) => response)
    );
  }

  deleteUser(user: User): Observable<Response> {
    return this.http.delete(this.userUrl + user.userId, this.options).pipe(
      map((response: Response) => response)
    );
  }

  listUsers(): Observable<User[]> {
    return this.http.get(this.userUrl + "get").pipe(
      map((response: Response) => response.json())
    );
  }

  addProject(project: Project): Observable<Response> {
    return this.http.post(this.projectUrl + "create", JSON.stringify(project), this.options).pipe(
      map((response: Response) => response)
    );
  }

  editProject(project: Project): Observable<Response> {
    return this.http.put(this.projectUrl + "update", JSON.stringify(project), this.options).pipe(
      map((response: Response) => response)
    );
  }

  listProjects(): Observable<Project[]> {
    return this.http.get(this.projectUrl + "get").pipe(
      map((response: Response) => response.json())
    );
  }

  addTask(task: Task): Observable<Response> {
    return this.http.post(this.taskUrl + "create", JSON.stringify(task), this.options).pipe(
      map((response: Response) => response)
    );
  }

  listTasks(): Observable<Task[]> {
    return this.http.get(this.taskUrl + "get").pipe(
      map((response: Response) => response.json())
    );
  }

   listParentTasks(): Observable<Task[]> {
    return this.http.get(this.taskUrl + "get/parent").pipe(
      map((response: Response) => response.json())
    );
  }

}
