import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isDev = process.env.NODE_ENV !== 'production';

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
    origin: isDev
      ? ['http://localhost:4200', 'http://localhost:4000']
      : ['https://francog.dev', 'https://www.francog.dev'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 🛡️ Pipes globales de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 🔥 Ignora propiedades que no están en el DTO
      forbidNonWhitelisted: true, // 🚫 Si alguien manda una propiedad no permitida → error 400
      transform: true, // 🔄 Convierte automáticamente params, query y body al tipo adecuado
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Backend listo en: http://localhost:${port}`);
  console.log(`📚 Swagger disponible en: http://localhost:${port}/api`);
}
bootstrap();
