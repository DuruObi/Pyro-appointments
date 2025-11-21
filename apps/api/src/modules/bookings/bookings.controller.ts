import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('forms/:formId/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Param('formId') formId: string, @Body() body: any) {
    // Expect: { name, email, phone, slot, data }
    const payload = {
      formId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      slot: new Date(body.slot),
      dataJson: JSON.stringify(body.data || {}),
    };
    const booking = await this.bookingsService.createBooking(payload);
    // TODO: trigger notifications (email/webhook)
    return booking;
  }

  @Get()
  async list(@Param('formId') formId: string) {
    return this.bookingsService.listBookingsForForm(formId);
  }
}
