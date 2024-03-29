import { User } from "../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from './task.entity'
import { InternalServerErrorException, Logger } from '@nestjs/common';
@EntityRepository(Task)
export class TasksRespository extends Repository<Task> {
    private logger = new Logger('TasksRespository');

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const {status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user }).where;

        if(status) {
            query.andWhere('task.status = :status', { status });
        }

        if(search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` }
            );
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        }   
        catch (error) {
            this.logger.error(`Fail to get tasks from user "${user.username}".`, error.stack);
            throw new InternalServerErrorException();
        }     
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        try {
            const task = this.create({
                title,
                description,
                status: TaskStatus.OPEN,
                user,
            });
            await this.save(task);
            return task;
        }
        catch (error) {
            this.logger.error(`Fail to create new task for "${user.username}".`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}