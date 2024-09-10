import axios from 'axios';
import {
  IZarinpalPaymentResponse,
  IZarinpalRequest,
  IZarinpalVerifyRequest,
  IZarinpalVerifyResponse,
} from '../zarinpal/interface/zarinpal.interface';
import { PaymentGateway } from './gateway';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });
export class ZarinpalGateway extends PaymentGateway {
  private readonly httpService: HttpService;

  async createPayment(
    request: IZarinpalRequest,
  ): Promise<IZarinpalPaymentResponse> {
    try {
      const response = await axios.post(`${process.env.REQUEST_PAY_ZARINPAL}`, {
        merchant_id: request.merchantId,
        amount: request.amount * 10,
        description: request.description,
        callback_url: request.callbackUrl,
      });

      console.log(`>>>>>${response.data.data.authority}`);

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

  async verifyPayment(
    verifyRequest: IZarinpalVerifyRequest,
  ): Promise<IZarinpalVerifyResponse> {
    try {
      console.log('test', {
        merchant_id: verifyRequest.merchantId,
        amount: verifyRequest.amount,
        authority: verifyRequest.authority,
      });

      console.log('VERIFY_PAY_ZARINPAL:', process.env.VERIFY_PAY_ZARINPAL);

      const response = await axios.post(`${process.env.VERIFY_PAY_ZARINPAL}`, {
        merchant_id: verifyRequest.merchantId,
        authority: verifyRequest.authority,
        amount: verifyRequest.amount,
      });

      console.log('^^^^^^' + response.data.data);

      if (response.data.data.code === 100) {
        return {
          status: response.data.data.code,
          refId: response.data.data.ref_id,
        };
      } else {
        throw new Error(
          `Verification failed with status ${response.data.data.Status}`,
        );
      }
    } catch (error) {
      throw new Error(`Error verifying payment: ${error}`);
    }
  }
}
