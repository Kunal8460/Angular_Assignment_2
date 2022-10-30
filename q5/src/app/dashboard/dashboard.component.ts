import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { StudentServiceService } from '../student-service.service';
StudentServiceService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loginCreds: any;
  constructor(private fb: FormBuilder,
    private routes: Router,
    private studentService: StudentServiceService
  ) {
    // this.loginCreds = fb.group({
    //   email: [''],
    //   password: ['']
    // })
  }

  ngOnInit(): void {
  }

  login() {
    this.studentService.loginService(this.loginCreds.email, this.loginCreds.password).subscribe((data: any) => {
    })
    // this.routes.navigate(['student-list'])
  }

}
