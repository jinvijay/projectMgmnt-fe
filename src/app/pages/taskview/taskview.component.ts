import { Component, OnInit } from '@angular/core';
import { Task } from '../../modal/task';
import { Project } from '../../modal/project';
import { ActivatedRoute } from '@angular/router'
import { ProjManagementService } from '../../service/proj-management.service';


@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  listedProjects: Project[] = [];
  _selectedProject: Project;
  serviceMessage: string;
  errorMsg: string;

  constructor(private activatedRoute: ActivatedRoute,
    private pmService: ProjManagementService) { }

  ngOnInit() {
    this.refreshTasks();
    this.refreshProjects();
  }

  get selectedProject(): Project {
    return this._selectedProject;
  }

  set selectedProject(value: Project) {
    this._selectedProject = value;
  }

  refreshTasks() {
    this.pmService.listTasks().subscribe(
      data => { this.tasks = data; this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

  refreshProjects() {
    this.pmService.listProjects().subscribe(
      data => { this.listedProjects = data; this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

  searchTasks() {
    this.filteredTasks = this.selectedProject ? this.performFilter(this.selectedProject) : [];

  }

  performFilter(project: Project): Task[] {
    return this.tasks.filter(
      (task: Task) => ((task.project.projectId === project.projectId)));
  }

}
