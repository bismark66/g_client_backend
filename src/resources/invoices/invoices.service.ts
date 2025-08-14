/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
// import { InvoiceStatus } from './enums/invoice-status.enum';
import { PrismaService } from '../../prisma-client/prisma-client.service';

export enum InvoiceStatus {
  Paid = 'Paid',
  Pending = 'Pending',
}

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    // Verify the learner exists
    const learner = await this.prisma.user.findUnique({
      where: { id: createInvoiceDto.learnerId, role: 'LEARNER' },
    });

    if (!learner) {
      throw new NotFoundException('Learner not found');
    }

    // Verify the track exists
    // const track = await this.prisma.user.findUnique({
    //   where: { id: createInvoiceDto.learnerId, role: 'LEARNER' },
    // });

    // if (!track) {
    //   throw new NotFoundException('Track not found');
    // }

    // Create invoice
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.prisma.invoice.create({
      data: {
        amount: createInvoiceDto.amount,
        status: createInvoiceDto.status || InvoiceStatus.Pending,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        user: { connect: { id: createInvoiceDto.learnerId } },
        payment_details: createInvoiceDto.payment_details,
        // track: { connect: { id: createInvoiceDto.trackId } },
      },
      include: {
        user: { select: { id: true, email: true, first_name: true } },
        // track: { select: { track_name: true, price: true } },
      },
    });
  }

  // async findAll() {
  //   return this.prisma.invoice.findMany({
  //     include: {
  //       user: { select: { id: true, email: true } },
  //       // track: { select: { track_name: true } },
  //     },
  //     // orderBy: { created_at: 'desc' },
  //   });
  // }

  async findAll() {
    return this.prisma.invoice
      .findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              first_name: true,
              last_name: true,
              created_at: true,
            },
          },
        },
      })
      .then((invoices) =>
        invoices.map((invoice) => ({
          id: invoice.id,
          name: `${invoice?.user?.first_name} ${invoice?.user?.last_name}`,
          email: invoice?.user?.email,
          due_date: invoice.due_date,
          amount: invoice.amount,
          status: invoice.status,
          // created_at: invoice.user.created_at,
          payment_details: invoice.payment_details,
        })),
      );
  }

  async findOne(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, first_name: true } },
        // track: { select: { track_name: true, price: true } },
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    // Verify invoice exists
    await this.findOne(id); // Reuses our existing findOne with validation

    return this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
      include: {
        user: { select: { email: true } },
        // track: { select: { track_name: true } },
      },
    });
  }

  async remove(id: number) {
    // Verify invoice exists
    await this.findOne(id); // Reuses our existing findOne with validation

    return this.prisma.invoice.delete({
      where: { id },
    });
  }

  async getLearnerInvoices(learnerId: number) {
    return this.prisma.invoice.findMany({
      where: { userId: learnerId },
      include: {
        // track: { select: { track_name: true, image: true } },
      },
      // orderBy: { created_at: 'desc' },
    });
  }

  async updateStatus(id: number, status: InvoiceStatus) {
    await this.findOne(id); // Validate invoice exists

    return this.prisma.invoice.update({
      where: { id },
      data: { status },
    });
  }
}
