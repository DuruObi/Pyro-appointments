// Given AvailabilityRule entries and service duration produce available slots
import { parseISO, addMinutes, set } from 'date-fns';

export function generateSlotsForDay(rules, date: Date, durationMin: number){
  // rules: [{weekday, startTime:"09:00", endTime:"17:00"}]
  const weekday = date.getDay();
  const rule = rules.find(r => r.weekday === weekday);
  if(!rule) return [];
  const [sh, sm] = rule.startTime.split(':').map(Number);
  const [eh, em] = rule.endTime.split(':').map(Number);
  let cur = set(date, { hours: sh, minutes: sm, seconds: 0, milliseconds: 0 });
  const end = set(date, { hours: eh, minutes: em, seconds: 0, milliseconds: 0 });
  const slots = [];
  while (cur.getTime() + durationMin * 60000 <= end.getTime()){
    const next = addMinutes(cur, durationMin);
    slots.push({ start: new Date(cur), end: next });
    cur = next;
  }
  return slots;
}
