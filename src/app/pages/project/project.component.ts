import { Component, OnInit } from '@angular/core';
import { Project } from '../../modal/project';
import { User } from '../../modal/user';
import { ActivatedRoute } from '@angular/router'
import { ProjManagementService } from '../../service/proj-management.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  newProject: Project = new Project();
  serviceMessage: string;
  errorMsg: string;
  isAddAction: boolean = true;
  projects: Project[];
  users: User[];
  selectedManager: User;

  constructor(private activatedRoute: ActivatedRoute,
    private pmService: ProjManagementService) { }

  ngOnInit() {
    this.refreshProjects();
    this.listUsers();
  }

  createProject() {
    this.pmService.addProject(this.newProject).subscribe(
      data => { this.serviceMessage = "Successfully added"; this.refreshProjects(); this.newProject = new Project(); },
      error => { this.serviceMessage = "Error in calling server"; console.log(error); }
    );
  }

  refreshProjects() {
    this.pmService.listProjects().subscribe(
      data => { this.projects = data; this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

  editClick(editProject: Project) {
    this.newProject = editProject;
    this.isAddAction = false;
  }

  editProject() {
    this.pmService.editProject(this.newProject).subscribe(
      data => { this.serviceMessage = "Successfully edited"; this.refreshProjects(); this.newProject = new Project(); },
      error => { this.serviceMessage = "Error in calling server"; console.log(error); }
    );
  }

  listUsers() {

    this.pmService.listUsers().subscribe(
      data => { this.users = data; this.errorMsg = null; },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );

  }

}
