import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.enableCors();

  await app.listen(3000);
}
bootstrap();

//  with https

// import { join } from 'path';

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppClusterService } from './libs/common/src/cluster/app-cluster.service';
// import * as fs from 'fs';
// import { NestExpressApplication } from '@nestjs/platform-express';

// async function bootstrap() {
//   const httpsOptions = {
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: 'makestudy', // Remove this if the key is not encrypted
//   };

//   const app = await NestFactory.create(AppModule, { httpsOptions });
//   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//     prefix: '/uploads/',
//   });
//   app.enableCors();
//   await app.listen(3000);
// }

// AppClusterService.clusterize(bootstrap);

// import { join } from 'path';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppClusterService } from './libs/common/src/cluster/app-cluster.service';
// import * as fs from 'fs';
// import { NestExpressApplication } from '@nestjs/platform-express';

// async function bootstrap() {
//   const httpsOptions = {
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: 'makestudy', // Remove this if the key is not encrypted
//   };

//   // Create the application and cast it to NestExpressApplication
//   const app = await NestFactory.create<NestExpressApplication>(AppModule, {
//     httpsOptions,
//   });

//   // Use static assets method
//   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//     prefix: '/uploads/',
//   });

//   app.enableCors();
//   await app.listen(3000);
// }

// AppClusterService.clusterize(bootstrap);
