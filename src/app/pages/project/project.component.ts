import { Component, OnInit } from '@angular/core';
import { Project } from '../../modal/project';
import { ActivatedRoute } from '@angular/router'
import { ProjManagementService } from '../../service/proj-management.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  newProject: Project = new Project();

  constructor(private activatedRoute: ActivatedRoute,
    private pmService: ProjManagementService) { }

  ngOnInit() {
  }

}
