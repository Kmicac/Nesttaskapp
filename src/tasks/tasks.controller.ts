import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
        return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string 
    //     ): Task {

    //     return this.tasksService.createTask(title, description);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {

        return this.tasksService.createTask(createTaskDto);
    }

     @Delete('/:id')
     deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
     }

     @Patch('/:id/status')
     updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus ): Task {

            return this.tasksService.updateTaskStatus(id, status);
        }
}
