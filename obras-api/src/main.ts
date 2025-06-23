import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { HttpErrorFilter } from './shared/filters/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Architect Management API')
    .setDescription('API para login de arquitectos y trabajadores')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // UI en /api

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
