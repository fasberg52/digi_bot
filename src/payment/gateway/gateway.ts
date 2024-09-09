import {
  IZarinpalPaymentResponse,
  IZarinpalRequest,
  IZarinpalVerifyRequest,
  IZarinpalVerifyResponse,
} from '../zarinpal/interface/zarinpal.interface';

export abstract class PaymentGateway {
  abstract createPayment(
    request: IZarinpalRequest,
  ): Promise<IZarinpalPaymentResponse>;
  abstract verifyPayment(
    verifyRequest: IZarinpalVerifyRequest,
  ): Promise<IZarinpalVerifyResponse>;
}
