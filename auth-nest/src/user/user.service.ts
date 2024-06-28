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

  async create(createUser: Prisma.usersCreateInput) {
    if (createUser.password.length < 6) {
      throw new NotAcceptableException(
        'password needs to have at least 6 caracters!',
      );
    }
    const saltOrRounds = 10;
    // crypting the password using bcrypt
    createUser.password = await bcrypt.hash(createUser.password, saltOrRounds);
    const user = await this.databaseService.users.create({ data: createUser });
    delete user.password; //to not show the password in the return

    return user;
  }

  findAll() {
    return this.databaseService.users.findMany();
  }

  findOne(id: number) {
    return this.databaseService.users.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string) {
    let user = this.databaseService.users.findUnique({
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

  async update(id: number, updateUser: Prisma.usersUpdateInput) {
    // crypting the password using bcrypt
    const { password, name, updatedAt, image } = updateUser;
    const hashedPassword = password ? await bcrypt.hash(password.toString(), 10) : undefined;
    return this.databaseService.users.update({
      data: {
        name,
        password: hashedPassword,
        updatedAt,
        image
      },
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.users.delete({
      where: {
        id,
      },
    });
  }
}
