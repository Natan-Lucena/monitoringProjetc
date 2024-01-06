import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
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
})
export class AppModule {}
