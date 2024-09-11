import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import {
  IZarinpalPaymentResponse,
  IZarinpalRequest,
  IZarinpalVerifyRequest,
  IZarinpalVerifyResponse,
} from '../zarinpal/interface/zarinpal.interface';
import { PaymentGateway } from './gateway';

@Injectable()
export class ZarinpalGateway extends PaymentGateway {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async createPayment(
    request: IZarinpalRequest,
  ): Promise<IZarinpalPaymentResponse> {
    try {
      const response = await this.httpService
        .post(`${process.env.REQUEST_PAY_ZARINPAL}`, {
          merchant_id: request.merchantId,
          amount: request.amount,
          description: request.description,
          callback_url: `${request.callbackUrl}`,
        })
        .toPromise();

      if (response.data.data.code === 100) {
        return {
          status: response.data.code,
          authority: response.data.authority,
          url: `${process.env.START_PAY_ZARINPAL}/${response.data.data.authority}`,
        };
      } else {
        throw new Error(
          `Payment request failed with status ${response.data.code}`,
        );
      }
    } catch (error) {
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  async verifyPayment(verifyRequest: IZarinpalVerifyRequest): Promise<any> {
    try {
      const response = await this.httpService
        .post(`${process.env.VERIFY_PAY_ZARINPAL}`, {
          merchant_id: verifyRequest.merchantId,
          authority: verifyRequest.authority,
          amount: verifyRequest.amount,
        })
        .toPromise();

      console.log('^^^^' + response.data.data);

      if (response.data.data.code === 100) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      throw new Error(`Error verifying payment: ${error.message}`);
    }
  }
}
