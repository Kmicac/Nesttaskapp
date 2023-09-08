import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
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
    @UsePipes(ValidationPipe)
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
        @Body('status', TaskStatusValidationPipe) status: TaskStatus ): Task {

            return this.tasksService.updateTaskStatus(id, status);
        }
}
