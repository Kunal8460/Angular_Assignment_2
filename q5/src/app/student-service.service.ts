import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  url = "htpp://localhost:3400"
  constructor(private http: HttpClient) { }

  loginService(email: String, password: String) {
    return this.http.post(this.url + "/login", { email, password })
  }

}
