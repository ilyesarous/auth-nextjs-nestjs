import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: MailerService,
  ) {}

  async create(createUser: Prisma.userCreateInput) {
    if (createUser.password.length < 6) {
      throw new NotAcceptableException(
        'password needs to have at least 6 caracters!',
      );
    }
    const saltOrRounds = 10;
    // crypting the password using bcrypt
    createUser.password = await bcrypt.hash(createUser.password, saltOrRounds);
    const user = await this.databaseService.user.create({ data: createUser });
    delete user.password; //to not show the password in the return

    return user;
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string) {
    let user = this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async sendMail(email: string) {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email! if not click below to change your password: 
    http://localhost:3000/new-password`;

    return this.mailService.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: `Forgot your password?`,
      text: message,
    });
  }

  async update(id: number, updateUser: Prisma.userUpdateInput) {
    // crypting the password using bcrypt
    const { password, name, updatedAt } = updateUser;
    const hashedPassword = password ? await bcrypt.hash(password.toString(), 10) : undefined;
    return this.databaseService.user.update({
      data: {
        name,
        password: hashedPassword,
        updatedAt,
      },
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
