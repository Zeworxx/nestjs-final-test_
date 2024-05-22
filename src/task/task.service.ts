import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private tasksRepository: Repository<TaskEntity>,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<TaskEntity> {
        return this.tasksRepository.save({ name, userId, priority });
    }

    async getTaskByName(name: string): Promise<TaskEntity> {
        return await this.tasksRepository.findOne({ where: { name } });
    }

    async getUserTasks(userId: number): Promise<TaskEntity[]> {
        return this.tasksRepository.find({ where: { userId } });
    }

    async resetData(): Promise<void> {
        return this.tasksRepository.clear();
    }
}
