import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OffersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createOffer: Prisma.offersCreateInput) {
    return this.databaseService.offers.create({ data: createOffer });
  }

  findAll() {
    return this.databaseService.offers.findMany();
  }

  findOne(id: number) {
    return this.databaseService.offers.findUnique({ 
      where: {
        id,
      },
    });
  }

  update(id: number, updateOffer: Prisma.offersUpdateInput) {
    return this.databaseService.offers.update({
      data: updateOffer,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.offers.delete({
      where: {
        id,
      },
    });
  }
}
