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
  users: User[] = [];
  filteredUsers: User[] = [];
  errorMsg: string;
  isAddAction: boolean = true;
  _searchText: string;

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filteredUsers = this.searchText ? this.performFilter(this.searchText) : this.users;
  }

  constructor(private activatedRoute: ActivatedRoute,
    private pmService: ProjManagementService) {

  }

  ngOnInit() {
    this.refreshUsers();
  }

  performFilter(searchText: string): User[] {
    searchText = searchText.toLocaleLowerCase();
    return this.users.filter(
      (user: User) => ((user.firstName.toLocaleLowerCase().indexOf(searchText) !== -1) ||
        (user.lastName.toLocaleLowerCase().indexOf(searchText) !== -1)));
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
      data => { this.users = data; this.filteredUsers = this.users; this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

  sortByFirstName() {
    this.filteredUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  sortByLastName() {
    this.filteredUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  sortByEmpId() {
    this.filteredUsers.sort((a, b) => a.empId - b.empId);
  }

}
