import { DailyTimelineStep } from '../types/coachEngine.types';

export class DailyTimelineEngine {
  public static getTodayTimeline(): DailyTimelineStep[] {
    return [
      { time: '09:10 AM', title: 'Machine Learning Essentials (AI201B)', type: 'class', room: 'H605', isCompleted: true },
      { time: '10:00 AM', title: 'Probability & Statistics (MA105L)', type: 'class', room: 'H605', isCompleted: true },
      { time: '10:50 AM', title: 'Free Slot (Study Window)', type: 'free_slot', duration: '50 min' },
      { time: '11:00 AM', title: 'CampusOS Suggests: 45m Database Systems Revision', type: 'recommendation', duration: '45 min' },
      { time: '11:40 AM', title: 'Cloud Foundations (AI103E)', type: 'class', room: 'H605' },
      { time: '01:20 PM', title: 'Lunch Break', type: 'free_slot', duration: '60 min' },
      { time: '02:20 PM', title: 'Constitution of India (HS109L)', type: 'class', room: 'H605' },
      { time: '05:00 PM', title: 'Database Systems ER Diagram Assignment', type: 'assignment' },
      { time: '06:00 PM', title: 'Daily 2-Hour Focus Goal Complete', type: 'goal' },
    ];
  }
}
