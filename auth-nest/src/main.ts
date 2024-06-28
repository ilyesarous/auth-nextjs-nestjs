import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); //cookieParser is needed to show the content of a cookie
  app.enableCors({ // cors needs to be enabled to alllow the front-end communicate with the back-end
    origin: 'http://localhost:3000',
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true, //to allow sending the cookie/token into the front 
  });
  app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
