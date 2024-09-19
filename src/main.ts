import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  // Load the SSL certificates with an absolute path
  const httpsOptions = {
    key: fs.readFileSync(join(__dirname, '..', 'private.key')),
    cert: fs.readFileSync(join(__dirname, '..', 'certificate.crt')),
    ca: fs.readFileSync(join(__dirname, '..', 'ca_bundle.crt')),
  };

  // Create the HTTPS server using the certificates
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.enableCors();

  await app.listen(3001);
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
