import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { MonitoriaModule } from './monitoria/monitoria.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InfraService } from './infra/infra.service';
import { InfraModule } from './infra/infra.module';
import { DateProviderService } from './date-provider/date-provider.service';
import { DateProviderModule } from './date-provider/date-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MailerModule,
    MonitoriaModule,
    UserModule,
    ScheduleModule.forRoot(),
    InfraModule,
    DateProviderModule,
  ],
  providers: [InfraService, DateProviderService],
})
export class AppModule {}
