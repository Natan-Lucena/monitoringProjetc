import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class DateProviderService {
  nowDate() {
    const nowDate = dayjs().toISOString();
    return nowDate;
  }
  daysDiffData(startDate: string, endDate: string): number {
    const firstDate = dayjs(startDate);
    const finalDate = dayjs(endDate);

    const daysDiference = finalDate.diff(firstDate, 'day');

    return daysDiference;
  }
}
