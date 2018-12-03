import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { ProjectComponent } from './pages/project/project.component';
import { TaskComponent } from './pages/task/task.component';
import { ProjManagementService } from './service/proj-management.service';

const appPath: Routes = [
  { path: 'addUser', component: UserComponent },
  { path: 'addProject', component: ProjectComponent },
  { path: 'addTask', component: TaskComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appPath)
  ],
  providers: [
    ProjManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
