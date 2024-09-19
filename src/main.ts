import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppClusterService } from './libs/common/src/cluster/app-cluster.service';
// import * as fs from 'fs';

async function bootstrap() {
  // Load the SSL certificates with an absolute path
  // const httpsOptions = {
  //   key: fs.readFileSync(join(__dirname, '..', 'private.key')),
  //   cert: fs.readFileSync(join(__dirname, '..', 'certificate.crt')),
  //   ca: fs.readFileSync(join(__dirname, '..', 'ca_bundle.crt')),
  // };

  // Create the HTTPS server using the certificates
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   httpsOptions,
  // });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.enableCors();

  await app.listen(8080);
}
// bootstrap();
AppClusterService.clusterize(bootstrap);
