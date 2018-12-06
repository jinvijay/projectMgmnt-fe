import { Project } from './project';
import { User } from './user';

export class Task {
    public taskId: number;
    public parentTask: Task;
    public project: Project;
    public task: string;
    public startDate: Date;
    public endDate: Date;
    public priority: number;
    public user: User;
}