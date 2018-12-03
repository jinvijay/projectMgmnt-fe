import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../modal/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjManagementService {

  baseUrl: string;
  userUrl: string;
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

}
