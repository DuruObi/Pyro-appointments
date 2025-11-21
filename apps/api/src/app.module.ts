import { Module } from '@nestjs/common';
import { FormsModule } from './modules/forms/forms.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [FormsModule, BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
