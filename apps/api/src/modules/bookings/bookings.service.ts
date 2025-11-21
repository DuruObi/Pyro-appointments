import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class BookingsService {
  async createBooking(data: { formId: string; name: string; email: string; phone?: string; dataJson?: string; slot: Date }) {
    return prisma.booking.create({ data });
  }

  async listBookingsForForm(formId: string) {
    return prisma.booking.findMany({ where: { formId } });
  }
}
