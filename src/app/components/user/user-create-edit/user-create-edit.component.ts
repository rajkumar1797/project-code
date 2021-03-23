import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {
  id: number;
  userForm: FormGroup;
  user:User;
  userList = JSON.parse(localStorage.getItem('userList'));

  constructor(private route:ActivatedRoute,private router:Router,private formBuilder: FormBuilder,
    private snackBar:MatSnackBar,private datePipe:DatePipe) { 
    this.route.params.subscribe(params => {
      this.id = +params['id'];
  });
  }

  ngOnInit(): void {
    this.user = new User();
    this.userForm = this.formBuilder.group({
      userId: [this.user.userId],
      userCode: [this.user.userCode, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      dob: [this.user.dob, Validators.required],
      email: [this.user.email,  Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      phoneNumber: [this.user.phoneNumber,  Validators.compose([Validators.required, Validators.maxLength(10)])]
    });
  
    if(this.id)
      this.getUserById(this.id);
  }

  public getUserById(userId:number){
    for(var i=0;i<this.userList.length;i++){
      if(userId == this.userList[i].userId){
        this.userForm.patchValue({
          userId: this.userList[i].userId,
          userCode: this.userList[i].userCode,
          firstName: this.userList[i].firstName,
          lastName: this.userList[i].lastName,
          dob: new Date(this.userList[i].dob),
          email:  this.userList[i].email,
          phoneNumber: this.userList[i].phoneNumber
       });
      }
    }
  }

  public submitUser(){
    if(!this.id){
      this.userForm.value.dob = this.datePipe.transform(this.userForm.value.dob,'MM/dd/yyyy');
      this.userForm.value.userId=this.userList.length+1;
      this.userList.push(this.userForm.value);
      localStorage.setItem('userList',JSON.stringify(this.userList));
      this.snackBar.open("Created Successfully !!!", '×', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
      this.router.navigate(["/user/list"]);
    }else if(this.id){
      this.userForm.value.dob = this.datePipe.transform(this.userForm.value.dob,'MM/dd/yyyy');
      for(var i=0;i<this.userList.length;i++){
        if(this.id == this.userList[i].userId){
          this.userList[i]=this.userForm.value;
          localStorage.setItem('userList',JSON.stringify(this.userList));
          this.snackBar.open("Updated Successfully !!!", '×', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
          this.router.navigate(["/user/list"]);
        }
      }
    }
  }

}
