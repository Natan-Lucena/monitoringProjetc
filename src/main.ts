import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Monitoring Project')
    .setDescription(
      'O Swagger, também conhecido como OpenAPI, é uma biblioteca amplamente utilizada no contexto backend, disponível para várias linguagens e frameworks. Ele fornece uma interface que descreve detalhadamente cada endpoint e estrutura de dados da sua aplicação. Neste contexto universitário, o projeto de gerenciamento de monitorias é essencial para organizar e acompanhar as atividades de monitoria em uma universidade. Esta documentação detalha os endpoints e estruturas de dados relacionados ao gerenciamento de monitorias de cadeiras, permitindo uma melhor compreensão e integração com a aplicação.',
    )
    .setVersion('1.0')
    .addTag('monitoria')
    .addServer('http://localhost:3333/', 'Local environment')
    .addTag('auth')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
