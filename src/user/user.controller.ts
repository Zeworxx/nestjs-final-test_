import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    HttpStatus,
    InternalServerErrorException,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreateResponse } from 'src/response/create.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(
        @Body(new ValidationPipe()) body: CreateUserDto,
    ): Promise<CreateResponse> {
        try {
            await this.userService.addUser(body.email);
            return {
                status: HttpStatus.CREATED,
                message: 'User created successfully',
            };
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
}
