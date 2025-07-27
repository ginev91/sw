import { Controller, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { UserRole } from './enums/user-role.enum';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id/deactivate')
  @Roles(UserRole.ADMIN)
  deactivateUser(@Param('id') id: number) {
    return this.userService.deactivateUser(id);
  }

  @Patch(':id/activate')
  @Roles(UserRole.ADMIN)
  activateUser(@Param('id') id: number) {
    return this.userService.activateUser(id);
  }
  @Get('me')
  @Roles(UserRole.USER, UserRole.ADMIN)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}