import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async addUser(email: string): Promise<void> {
        await this.usersRepository.save({ email });
    }

    async getUser(email: string): Promise<UserEntity> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async resetData(): Promise<void> {
        await this.usersRepository.clear();
    }
}
