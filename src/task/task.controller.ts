import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreateResponse } from 'src/response/create.response';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    async addTask(
        @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
    ): Promise<CreateResponse> {
        try {
            await this.taskService.addTask(
                createTaskDto.name,
                createTaskDto.userId,
                createTaskDto.priority,
            );
            return {
                status: HttpStatus.CREATED,
                message: 'Task created successfully',
            };
        } catch (error) {
            if (error.code === '23502') {
                throw new BadRequestException();
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    @Get('user/:userId')
    async getTasksByUserId(
        @Param(
            'userId',
            new ParseIntPipe({
                exceptionFactory: () => new BadRequestException(),
            }),
        )
        userId: number,
    ): Promise<TaskEntity[]> {
        try {
            if (userId < 0) {
                throw new BadRequestException();
            }

            return await this.taskService.getUserTasks(userId);
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
