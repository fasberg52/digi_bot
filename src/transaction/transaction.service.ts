import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionRepository } from './repository/transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SubscribeRepository } from 'src/subscribe/repository/subscribe.repository';
import { TransactionStatus } from './enums/transaction.enum';
import { ZarinpalService } from 'src/payment/zarinpal/zarinpal.service';
import { TransactionEntity } from './entity/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly zarinpalService: ZarinpalService,
  ) {}
  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { userId, subscribeId, amount } = createTransactionDto;

    const subscription = await this.subscribeRepository.findOne({
      where: { id: subscribeId },
    });
    if (!subscription) {
      throw new NotFoundException('اشتراک یافت نشد');
    }
    const transaction = this.transactionRepository.create({
      status: TransactionStatus.PENDING,
      userId,
      subscribeId,
      amount,
    });
    return await this.transactionRepository.save(transaction);
  }

  async openTransaction(createTransactionDto: CreateTransactionDto) {
    const newTransaction = await this.createTransaction(createTransactionDto);

    const paymentResponse = await this.zarinpalService.createZarinpalPayment({
      amount: newTransaction.amount,
      description: `پرداخت برای اشتراک: ${newTransaction.subscribeId}`,
      callbackUrl: process.env.CALLBACK_URL_ZARINPAL,
      merchantId: process.env.MERCHANT_ID_ZARINPAL,
    });

    return {
      paymentUrl: paymentResponse.url,
      transactionId: newTransaction.id,
    };
  }

  async verifyTransaction(
    authority: string,
    status: string,
    transactionId: string,
  ) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException('تراکنش یافت نشد');
    }

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new BadRequestException('این تراکنش در وضعیت معتبر نیست');
    }

    const verificationResponse =
      await this.zarinpalService.verifyZarinpalPayment({
        authority,
        amount: transaction.amount,
        merchantId: process.env.MERCHANT_ID_ZARINPAL,
      });

    if (verificationResponse.status === 100 && status === 'OK') {
      transaction.status = TransactionStatus.VERIFIED;
      transaction.refId = verificationResponse.refId;
    } else {
      transaction.status = TransactionStatus.CANCELLED;
    }

    await this.transactionRepository.save(transaction);

    return {
      transaction,
      verificationResponse,
    };
  }
}