import { Injectable } from '@nestjs/common';
import { CadeiraRepository } from 'src/providers/repositories/cadeiraRepository';

@Injectable()
export class GetMonitoriaByCadeirasService {
  constructor(
    private cadeiraRepository: CadeiraRepository,
  ) {}

  async getMonitoriasByCadeiras(cadeiras: string[]) {
    return await this.cadeiraRepository.getMonitoriasByCadeiras(cadeiras);
  }

}
