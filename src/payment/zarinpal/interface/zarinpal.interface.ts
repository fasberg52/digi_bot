export interface IZarinpalRequest {
  amount: number;
  description: string;
  callbackUrl: string;
  merchantId: string;
  mobile?: string;
  email?: string;
}

export interface IZarinpalVerifyRequest {
  authority: string;
  amount: number;
  merchantId: string;
}

export interface IZarinpalPaymentResponse {
  status: number;
  authority: string;
  url: string;
}

export interface IZarinpalVerifyResponse {
  status: number;
  refId: number;
}
