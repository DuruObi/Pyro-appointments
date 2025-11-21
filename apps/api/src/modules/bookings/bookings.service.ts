import { Injectable, ConflictException } from '@nestjs/common';
          { slotEnd: { gt: start } },
          { status: { not: 'cancelled' } },
        ],
      },
    });
    return !!overlaps;
  }

  async createBooking(payload: {
    formId: string;
    serviceId?: string;
    name: string;
    email: string;
    phone?: string;
    slotStart: Date;
    slotEnd: Date;
    data?: any;
  }) {
    // availability validation: ensure within rules (simple example)

    if (await this.hasCollision(payload.formId, payload.slotStart, payload.slotEnd)) {
      throw new ConflictException('Selected slot is no longer available');
    }

    const booking = await prisma.booking.create({
      data: {
        formId: payload.formId,
        serviceId: payload.serviceId,
        customerName: payload.name,
        customerEmail: payload.email,
        customerPhone: payload.phone,
        slotStart: payload.slotStart,
        slotEnd: payload.slotEnd,
        dataJson: JSON.stringify(payload.data || {}),
        status: 'pending',
      },
    });

    // trigger notification + webhooks + payment if required
    // enqueue job: notifications.send_new_booking

    return booking;
  }
}
