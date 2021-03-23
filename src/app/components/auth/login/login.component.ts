import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login:Login;
  userList:User[];

  constructor(public formBuilder: FormBuilder,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.login = new Login();
    this.loginForm = this.formBuilder.group({
      'username': [this.login.username, Validators.required],
      'password': [this.login.password, Validators.required] 
    });

  }

  public onLoginFormSubmit(values:Object) {
    if (this.loginForm.valid) {
      this.userService.getUsers().subscribe(data =>{
        this.userList=data;
        localStorage.setItem('userList', JSON.stringify(this.userList));
        this.router.navigate(['/user']);
      });  
      
    }
  }

}
