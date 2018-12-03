import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ProjManagementService } from '../../service/proj-management.service';
import { User } from '../../modal/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newUser: User = new User();
  serviceMessage: string;
  users: User[];
  errorMsg: string;
  isAddAction: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private pmService: ProjManagementService) { }

  ngOnInit() {
    this.refreshUsers();
  }

  createUser() {
    this.pmService.addUser(this.newUser).subscribe(
      data => { this.serviceMessage = "Successfully added"; this.refreshUsers(); this.newUser = new User(); },
      error => { this.serviceMessage = "Error in calling server"; console.log(error); }
    );
  }

  editClick(editUser: User) {
    this.newUser = editUser;
    this.isAddAction = false;
  }

  editUser() {
    this.pmService.editUser(this.newUser).subscribe(
      data => { this.serviceMessage = "Successfully edited"; this.refreshUsers(); this.newUser = new User(); },
      error => { this.serviceMessage = "Error in calling server"; console.log(error); }
    );
  }

  deleteUser(deleteUser: User) {
    this.pmService.deleteUser(deleteUser).subscribe(
      data => { this.serviceMessage = "Successfully deleted"; this.refreshUsers(); },
      error => { this.serviceMessage = "Error in calling server"; console.log(error); }
    );
  }

  refreshUsers() {
    this.pmService.listUsers().subscribe(
      data => { this.users = data;  this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

}
