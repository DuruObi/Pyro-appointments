import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class FormsService {
  async getPublicFormBySlug(slug: string) {
    return prisma.form.findUnique({ where: { slug } });
  }

  async createForm(data: { userId: string; title: string; slug: string; schemaJson: string }) {
    return prisma.form.create({ data });
  }
}
