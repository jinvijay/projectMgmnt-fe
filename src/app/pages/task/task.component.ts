import { Component, OnInit } from '@angular/core';
import { Task } from '../../modal/task';
import { Project } from '../../modal/project';
import { User } from '../../modal/user';
import { ActivatedRoute } from '@angular/router'
import { ProjManagementService } from '../../service/proj-management.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  newTask: Task = new Task();
  serviceMessage: string;
  errorMsg: string;
  users: User[];
  projects: Project[];
  tasks: Task[];
  parentTasks: Task[];

  constructor(private activatedRoute: ActivatedRoute,
    private pmService: ProjManagementService) { }

  ngOnInit() {
    this.refreshProjects();
    this.listUsers();
    this.refreshParentTasks();
  }

  refreshProjects() {
    this.pmService.listProjects().subscribe(
      data => { this.projects = data; this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

  listUsers() {
    this.pmService.listUsers().subscribe(
      data => { this.users = data; this.errorMsg = null; },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

  createTask() {
    this.pmService.addTask(this.newTask).subscribe(
      data => { this.serviceMessage = "Successfully added"; this.refreshTasks(); this.refreshParentTasks(); this.newTask = new Task(); },
      error => { this.serviceMessage = "Error in calling server"; console.log(error); }
    );
  }

  refreshTasks() {
    this.pmService.listTasks().subscribe(
      data => { this.tasks = data; this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

  refreshParentTasks() {
    this.pmService.listParentTasks().subscribe(
      data => { this.parentTasks = data; this.errorMsg = null;},
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
    
  }


}
