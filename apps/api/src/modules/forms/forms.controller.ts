import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FormsService } from './forms.service';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get(':slug')
  async getPublicForm(@Param('slug') slug: string) {
    const form = await this.formsService.getPublicFormBySlug(slug);
    if (!form) return { error: 'not_found' };
    return {
      id: form.id,
      title: form.title,
      schema: JSON.parse(form.schemaJson),
    };
  }

  @Post()
  async create(@Body() payload: any) {
    // minimal create endpoint for testing
    const created = await this.formsService.createForm(payload);
    return created;
  }
}
