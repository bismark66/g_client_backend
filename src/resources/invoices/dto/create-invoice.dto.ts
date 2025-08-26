import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum InvoiceStatus {
  Paid = 'Paid',
  Pending = 'Pending',
}

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Invoice amount in cents',
    example: 10000, // $100.00 represented as cents
  })
  @IsNumber()
  amount: number;

  //   @ApiProperty({
  //     description: 'ID of the track being purchased',
  //     example: 1,
  //   })
  //   @IsNumber()
  //   trackId: number;

  @ApiProperty({
    description: 'ID of the learner making the purchase',
    example: 123,
  })
  @IsNumber()
  learnerId: number;

  @ApiProperty({
    enum: InvoiceStatus,
    enumName: 'InvoiceStatus',
    description: 'Payment status of the invoice',
    example: InvoiceStatus.Pending,
  })
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @ApiProperty({
    description: 'Payment details for the invoice',
    example: 'Credit card: 1234-5678-9012-3456',
  })
  payment_details: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  trackId: number;
}
