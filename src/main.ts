import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Franco Backend API')
    .setDescription('Documentación de la API Blog + Posts')
    .setVersion('1.0')
    .addTag('posts')
    .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 🔥 Habilita CORS para permitir conexiones desde tu frontend
  app.enableCors({
    origin: [
      'https://francog.dev',
      'https://www.francog.dev',
      'http://localhost:4200',
    ],
  });

  // 🛡️ Pipes globales de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 🔥 Ignora propiedades que no están en el DTO
      forbidNonWhitelisted: true, // 🚫 Si alguien manda una propiedad no permitida → error 400
      transform: true, // 🔄 Convierte automáticamente params, query y body al tipo adecuado
    }),
  );

  await app.listen(3000);
  console.log(`🚀 Backend listo en: http://localhost:3000`);
  console.log(`📚 Swagger disponible en: http://localhost:3000/api`);
}
bootstrap();
