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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @UseInterceptors( //interceptor to upload a file
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images', // folder destination 
        filename: (req, file, cb) => {
          const filename = `UPLOADEDPROFILEPIC-${uuidv4()}-${file.originalname}`; // change the file name
          cb(null, filename);
        },  
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUser: Prisma.usersCreateInput,
  ) {
    if (file) {
      createUser.image = file.filename;
    }
    
    return this.userService.create(createUser);
  }

  @Post('login')
  async login(
    @Body() user: Prisma.usersCreateInput,

    @Res({ passthrough: true }) res: Response,
  ) {
    if (user.password.length < 6) { 
      throw new NotAcceptableException(
        'password needs to have at least 6 caracters!',
      );
    }
    const user1 = await this.userService.findOneByEmail(user.email);
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

  @Post('forgetPassword')
  async forgetPassword(
    @Body() user: Prisma.usersCreateInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    //check if the user exists or not
    const user1 = await this.userService.findOneByEmail(user.email);
    if (!user1) {
      throw new NotFoundException('no user found! check your email!');
    }
    //create a token and save it in a cookie so we can use the users info to update the password later
    const jwt = await this.jwtService.signAsync({ id: user1.id });
    res.cookie('jwt', jwt, { httpOnly: true });
    //send an email that containes a link for updating the password
    const mail = this.userService.sendMail(user.email);
    return mail;
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
  @UseInterceptors( //interceptor to upload a file
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images', // folder destination 
        filename: (req, file, cb) => {
          const filename = `UPLOADEDPROFILEPIC-${uuidv4()}-${file.originalname}`; // change the file name
          cb(null, filename);
        },  
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUser: Prisma.usersUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateUser.image = file.filename;
    }
    console.log(updateUser.image);
    
    return this.userService.update(+id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
