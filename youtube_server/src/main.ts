import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin';

async function bootstrap() {


  const key = admin.initializeApp({
    credential: admin.credential.cert("./admin-firebase.json")
  });
  admin.messaging(key);
  const sv = 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets('uploads/vids/cvt')
  await app.listen(sv);
  console.log(`sever is running on: http://127.0.0.1:${sv}/`)
}
bootstrap();
