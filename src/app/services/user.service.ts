import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http : HttpClient) { }

  public url = "assets/data/";

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url + 'users.json');
}

}
