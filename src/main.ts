import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Bloging Project")
    .setDescription("This is the APIs documentation for the Bloging Project")
    .setVersion("1.0")
    .addTag("Blogging")
    .setContact('Bloging', 'https://blog.com', 'blogingapp@gmail.com')
    .build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
