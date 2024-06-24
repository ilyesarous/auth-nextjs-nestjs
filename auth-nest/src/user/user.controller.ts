import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.userCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() email: string, @Body() password: string) {
    const user = await this.userService.login(email);
    console.log(user);
    
    if (!user) {
      throw new NotFoundException('check your email!');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('check your password!');
    }
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.userUpdateInput,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
