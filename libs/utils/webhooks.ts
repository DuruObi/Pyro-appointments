import axios from 'axios';
import prisma from '../libs/client';

export async function triggerWebhooks(orgId: string, event: string, payload: any){
  const subs = await prisma.webhookSubscription.findMany({ where: { orgId } });
  for(const s of subs){
    // naive fire-and-forget
    axios.post(s.url, { event, payload }).catch(err => console.error('webhook failed', s.url, err.message));
  }
}
