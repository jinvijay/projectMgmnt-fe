import { Component, OnInit } from '@angular/core';
import { Task } from '../../modal/task';
import { ActivatedRoute } from '@angular/router'
import { ProjManagementService } from '../../service/proj-management.service';


@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit {

  tasks: Task[];
  serviceMessage: string;
  errorMsg: string;

  constructor(private activatedRoute: ActivatedRoute,
    private pmService: ProjManagementService) { }

  ngOnInit() {
    this.refreshTasks();
  }

  refreshTasks() {
    this.pmService.listTasks().subscribe(
      data => { this.tasks = data; this.errorMsg = null },
      error => { this.errorMsg = "Error in calling server"; console.log(error); }
    );
  }

}
