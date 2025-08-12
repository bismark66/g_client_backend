import { ApiProperty } from '@nestjs/swagger';

// // types/chartTypes.ts
// export interface RevenueData {
//   month: string;
//   totalRevenue: number;
//   paidInvoices: number;
//   pendingInvoices: number;
// }

export class RevenueDataDto {
  @ApiProperty()
  month: string;

  @ApiProperty()
  totalRevenue: number;

  @ApiProperty()
  paidInvoices: number;

  @ApiProperty()
  pendingInvoices: number;
}
