/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import PrismaService from 'src/prisma-client/prisma-client.service';
import { RevenueDataDto } from './dto/revenue-data.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAnalyticsDto: CreateAnalyticsDto) {
    return 'This action adds a new analytics';
  }

  async getAnalytics() {
    const totalLearners = await this.GetAllListenersCount();
    const totalTracks = await this.GetAllTracksCount();
    const totalRevenue = await this.GetAllRevenue();
    const recentTracks = await this.getRecentFourTracks();
    const recentInvoices = await this.getRecentFourInvoices();
    const revenueData = await this.getRevenueData();

    return {
      kpi: {
        totalLearners,
        totalTracks,
        totalRevenue,
      },
      tracks: recentTracks,
      invoices: recentInvoices,
      revenueData,
    };
  }

  async GetAllListenersCount() {
    return await this.prisma.user.count({
      where: {
        role: 'LEARNER',
      },
    });
  }

  async GetAllTracksCount() {
    return await this.prisma.invoice.count();
  }

  async getRecentFourTracks() {
    return await this.prisma.track.findMany({
      take: 4,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // async getRecentFourInvoices() {
  //   return await this.prisma.invoice.findMany({
  //     take: 4,
  //     orderBy: {
  //       due_date: 'desc',
  //     },
  //   });
  // }

  // First, define the return type at the top of your file
  // interface InvoiceWithRelations {
  //   id: number;
  //   amount: number;
  //   status: InvoiceStatus;
  //   due_date: string;
  //   payment_details: string | null;
  //   userId: number;
  //   user: {
  //     first_name: string;
  //     last_name: string | null;
  //     avatar?: string; // Make avatar optional if it's not in your schema
  //   } | null;
  //   track: {
  //     image: string | null;
  //   } | null;
  // }

  async getRecentFourInvoices() {
    const DEFAULT_AVATAR = 'https://via.placeholder.com/150';
    try {
      const invoices = await this.prisma.invoice.findMany({
        take: 4,
        orderBy: { due_date: 'desc' },
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
              // avatar: true, // Remove this since it's not in your User model
            },
          },
        },
      });

      return invoices.map((invoice) => ({
        id: invoice.id,
        name: invoice.user
          ? `${invoice.user.first_name} ${invoice.user.last_name}`
          : 'Unknown User',
        amount: invoice.amount,
        avatar: DEFAULT_AVATAR, // Removed user.avatar since it's not in schema
        // status: invoice.status,
      }));
    } catch (error) {
      console.error('Failed to fetch invoices', error);
      return [];
    }
  }

  async GetAllRevenue() {
    const {
      _sum: { amount },
    } = await this.prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
    });
    return amount;
  }

  // revenue.service.ts
  async getRevenueData(): Promise<RevenueDataDto[]> {
    return this.prisma.$queryRaw`
    SELECT 
      TRIM(TO_CHAR(
        TO_TIMESTAMP(invoices.due_date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), 
        'Month'
      )) AS month,
      CAST(EXTRACT(
        MONTH FROM TO_TIMESTAMP(invoices.due_date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
      ) AS INTEGER) AS month_num,
      CAST(SUM(CASE WHEN invoices.status = 'Paid'::"InvoiceStatus" THEN invoices.amount ELSE 0 END) AS INTEGER) AS "totalRevenue",
      CAST(COUNT(CASE WHEN invoices.status = 'Paid'::"InvoiceStatus" THEN 1 END) AS INTEGER) AS "paidInvoices",
      CAST(COUNT(CASE WHEN invoices.status = 'Pending'::"InvoiceStatus" THEN 1 END) AS INTEGER) AS "pendingInvoices"
    FROM invoices
    WHERE TO_TIMESTAMP(invoices.due_date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') >= 
          (NOW() - INTERVAL '6 months')::TIMESTAMP
    GROUP BY month, month_num
    ORDER BY month_num
  `;
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
    return `This action updates a #${id} analytics`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
