import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Res,
  Req,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createUserDto: Prisma.userCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body() user: Prisma.userCreateInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (user.password.length < 6) {
      throw new NotAcceptableException(
        'password needs to have at least 6 caracters!',
      );
    }
    const user1 = await this.userService.login(user.email);
    // check if the user is found or not
    if (!user) {
      throw new NotFoundException('check your email!');
    }
    // check the if the password is correct or not using the compare function provided by bcrypt
    if (!(await bcrypt.compare(user.password, user1.password))) {
      throw new NotFoundException('check your password!');
    }
    // create a new token to save the user's infos
    const jwt = await this.jwtService.signAsync({ id: user1.id });
    // save the token into cookie
    res.cookie('jwt', jwt, { httpOnly: true }); // store the jwt into a cookie
    return jwt;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('getUser')
  async getUser(@Req() req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      //check if the cookie is valid or not
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne(data.id);
      const { password, ...result } = user; //to avoid showing the password in the returned result
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    //to loggout, just clear the cookie
    res.clearCookie('jwt');

    return 'loggedout successfully';
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
