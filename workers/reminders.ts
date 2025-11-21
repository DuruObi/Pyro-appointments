import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import prisma from '../libs/client';

const connection = new IORedis(process.env.REDIS_URL!);
const remindersQueue = new Queue('reminders', { connection });

// Worker that processes reminder jobs
const worker = new Worker('reminders', async job => {
  const { bookingId, type } = job.data;
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if(!booking) return;
  // send email / whatsapp via notifications service
  // notifications.sendReminder(booking, type)
}, { connection });

export async function scheduleReminder(bookingId: string, when: Date, type: string){
  await remindersQueue.add('send_reminder', { bookingId, type }, { delay: when.getTime() - Date.now() });
}
