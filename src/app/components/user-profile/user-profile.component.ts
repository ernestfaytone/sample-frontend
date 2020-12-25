import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

// User interface
export class User {
  name: String;
  email: String;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  UserProfile: User[];
  id: null;
  message: any;
  errors: any;
  editMode: boolean;
  rowData: object;
  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    this.authService.profileUser().subscribe((data:any) => {
      this.UserProfile = [];
      this.UserProfile = data;
      this.editMode = false;
      this.rowData = {
        id: null,
        name: null,
        email: null
      };
    },
    error => {
      this.router.navigate(['login']);
    });
   
  }

  deleteUser(index: any){
    this.id = this.UserProfile[index]['id'];
    this.authService.delete(this.id).subscribe(
      result => {
        this.message = result.message;
      },
      error => {
        this.errors = error.error;
      });
    this.UserProfile.splice(index, 1);
  }

  editUser(index: any){
    this.editMode = true;
    this.rowData['id'] = this.UserProfile[index]['id'];
    this.rowData['name'] = this.UserProfile[index]['name'];
    this.rowData['email'] = this.UserProfile[index]['email'];
  }
  cancelEdit(index: any){
    this.editMode = false;
    this.errors = null;
    this.message = null;
    this.clearrowData();
  }
  saveUser(index: any){
    this.errors = null;
    this.message = null;
    this.authService.updateUser(this.rowData).subscribe(
      result => {
        this.UserProfile[index]['email'] = this.rowData['email'];
        this.UserProfile[index]['name'] = this.rowData['name'];
        this.editMode = false;
        this.message = result.message;
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.clearrowData();
      }
    )
    
  }

  clearrowData(){
    this.rowData = {
      id: null,
      name: null,
      email: null
    };
  }

  ngOnInit() { }

}
