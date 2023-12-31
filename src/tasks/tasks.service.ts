import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search),
            );
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const found =  this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task with id ' ${id} ' not found`)
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const tasks = this.getTaskById(id);
        tasks.status = status;
        return tasks;
    }
}
