import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  TransactionListResponse,
  TransactionResponse,
} from './response/transaction.response';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { getAllQuery } from '../shared/dto/query.dto';

@Controller('transaction')
@ApiTags('Transaction')
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @ApiOkResponse(TransactionResponse.getApiDoc())
  @Post()
  async openTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const result =
      await this.transactionService.openTransaction(createTransactionDto);
    return new TransactionResponse(result);
  }

  @ApiQuery({ name: 'authority', required: false })
  @ApiQuery({ name: 'transactionId', required: false })
  @Get('verify')
  async verifyTransaction(
    @Query('Authority') Authority: string,
    @Query('Status') Status: string,
    @Query('transactionId') transactionId: string,
  ) {
    return await this.transactionService.verifyTransaction(
      Authority,
      Status,
      transactionId,
    );
  }

  @ApiOkResponse(TransactionListResponse.getApiDoc())
  @Get()
  async getAllTransactions(
    @Query() query: getAllQuery,
  ): Promise<TransactionListResponse> {
    const [result, total] =
      await this.transactionService.getAllTransaction(query);
    return new TransactionListResponse(result, total);
  }
}
