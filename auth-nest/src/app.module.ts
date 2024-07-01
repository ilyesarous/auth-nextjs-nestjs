import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
// import { MulterModule } from '@nestjs/platform-express';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    OffersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
