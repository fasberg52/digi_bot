import { Injectable } from '@nestjs/common';
import { ZarinpalGateway } from '../gateway/zarinpal.gateway';
import {
  IZarinpalRequest,
  IZarinpalVerifyRequest,
} from './interface/zarinpal.interface';

@Injectable()
export class ZarinpalService {
  constructor(private readonly zarinpalGateway: ZarinpalGateway) {}

  async createZarinpalPayment(request: IZarinpalRequest) {
    return await this.zarinpalGateway.createPayment(request);
  }

  async verifyZarinpalPayment(verifyRequest: IZarinpalVerifyRequest) {
    return await this.zarinpalGateway.verifyPayment(verifyRequest);
  }
}
