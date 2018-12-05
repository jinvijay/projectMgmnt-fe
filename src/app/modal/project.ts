import { User } from './user';

export class Project {
    public projectId: number;
    public project: string;
    public startDate: Date;
    public endDate: Date;
    public manager: User;
    public priority: number;
    public checkDate: boolean;
}
