import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  API_CURRENT_VERSION,
  API_DESCRIPTION,
  API_NAME,
  API_ROOT,
  SITE_TITLE,
} from './config';

export const setupSwagger = (app: INestApplication) => {
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: SITE_TITLE,
  };
  const options = new DocumentBuilder()
    .setTitle(API_NAME)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_ROOT, app, document, customOptions);
};
