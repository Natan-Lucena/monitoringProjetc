import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MonitoriaService } from './monitoria/monitoria.service';
import { MonitoriaModule } from './monitoria/monitoria.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MailerModule,
    MonitoriaModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, MailerService, JwtService, MonitoriaService],
})
export class AppModule {}
