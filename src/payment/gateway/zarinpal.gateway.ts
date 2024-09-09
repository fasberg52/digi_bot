import axios from 'axios';
import {
  IZarinpalPaymentResponse,
  IZarinpalRequest,
  IZarinpalVerifyRequest,
  IZarinpalVerifyResponse,
} from '../zarinpal/interface/zarinpal.interface';
import { PaymentGateway } from './gateway';
import { HttpService } from '@nestjs/axios';

export class ZarinpalGateway extends PaymentGateway {
  private readonly httpService: HttpService;
  private baseUrl = 'https://www.zarinpal.com/pg/rest/WebGate/';

  async createPayment(
    request: IZarinpalRequest,
  ): Promise<IZarinpalPaymentResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}PaymentRequest.json`, {
        MerchantID: request.merchantId,
        Amount: request.amount,
        Description: request.description,
        CallbackURL: request.callbackUrl,
        Mobile: request.mobile,
        Email: request.email,
      });

      if (response.data.Status === 100) {
        return {
          status: response.data.Status,
          authority: response.data.Authority,
          url: `https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`,
        };
      } else {
        throw new Error(
          `Payment request failed with status ${response.data.Status}`,
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
      const response = await axios.post(
        `${this.baseUrl}PaymentVerification.json`,
        {
          MerchantID: verifyRequest.merchantId,
          Authority: verifyRequest.authority,
          Amount: verifyRequest.amount,
        },
      );

      if (response.data.Status === 100) {
        return {
          status: response.data.Status,
          refId: response.data.RefID,
        };
      } else {
        throw new Error(
          `Verification failed with status ${response.data.Status}`,
        );
      }
    } catch (error) {
      throw new Error(`Error verifying payment: ${error.message}`);
    }
  }
}
