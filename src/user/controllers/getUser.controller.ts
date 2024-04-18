import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUserService } from '../services/getUser.service';
import { GetUser } from 'src/auth/decorator';

@Controller('user/me')
@UseGuards(JwtGuard)
export class GetUserController {
  constructor(private getUserService: GetUserService) {}

  @Get()
  async handle(@GetUser('id') userId: string) {
    return await this.getUserService.execute(userId);
  }
}
