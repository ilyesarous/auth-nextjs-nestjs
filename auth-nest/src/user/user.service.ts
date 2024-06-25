import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  login(email: string) {
    let user = this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  update(id: number, updateUser: Prisma.userUpdateInput) {
    return this.databaseService.user.update({
      data: updateUser,
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
