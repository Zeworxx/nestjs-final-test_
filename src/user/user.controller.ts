import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    addUser(@Body() body: CreateUserDto) {
        try {
            this.userService.addUser(body.email);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException({
                    statusCode: HttpStatus.CONFLICT,
                    message: 'User already exists',
                    data: null,
                });
            } else if (error.code === '23502') {
                throw new BadRequestException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Missing required fields',
                    data: null,
                });
            }
        }
    }

    @Get('user/:email')
    async getUser(@Param('email') email: string) {
        return this.userService.getUser(email);
    }

    @Post('reset')
    async resetData() {
        return this.userService.resetData();
    }
}
