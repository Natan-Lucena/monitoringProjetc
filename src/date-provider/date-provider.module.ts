import { Module } from '@nestjs/common';
import { DateProviderService } from './date-provider.service';

@Module({
  providers: [DateProviderService],
  exports: [DateProviderService],
})
export class DateProviderModule {}
