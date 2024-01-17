import { Module } from '@nestjs/common';
import { InfraService } from './infra.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';

@Module({
  providers: [InfraService, DateProviderService],
  exports: [InfraService],
})
export class InfraModule {}
