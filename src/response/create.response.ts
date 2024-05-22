import { HttpStatus } from '@nestjs/common';

export interface CreateResponse {
    status: HttpStatus;
    message: string;
}
