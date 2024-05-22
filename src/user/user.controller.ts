import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async addUser(@Body() body: CreateUserDto): Promise<void> {
        try {
            await this.userService.addUser(body.email);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException();
            } else if (error.code === '23502') {
                throw new BadRequestException();
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    @Get('user/:email')
    async getUser(@Param('email') email: string): Promise<UserEntity> {
        return this.userService.getUser(email);
    }

    @Post('reset')
    async resetData() {
        return this.userService.resetData();
    }
}
