export class IntentEngine {
  public static resolveQuery(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('study today') || q.includes('what should i study')) {
      return `Based on your course schedule and exam weight, today's top study priority is **Database Systems (IT301L)**.\n\n- **Target**: 45-minute revision on BCNF Decomposition Rules.\n- **Reason**: Lecture tomorrow at 10:00 AM & last revised 4 days ago.`;
    }

    if (q.includes('miss') || q.includes('skip') || q.includes('attendance')) {
      return `📊 **Attendance Safeguard Analysis**:\n- **Current Attendance**: 100% (Safe)\n- **Status**: You have a 4-lecture buffer above the 75% boundary.\n- **Recommendation**: Attend tomorrow's Machine Learning lecture to preserve your 100% streak!`;
    }

    if (q.includes('next lecture') || q.includes('timetable') || q.includes('next class')) {
      return `📘 **Next Lecture**: Database Systems (IT301L)\n- **Time**: 10:00 AM\n- **Room**: H605\n- **Faculty**: Mr. Akash Kumar`;
    }

    if (q.includes('one hour') || q.includes('1 hour') || q.includes('short session')) {
      return `⏱ **1-Hour Express Plan**:\n1. **30 mins**: Revise Database Normalization slides.\n2. **20 mins**: Solve 3 SQL Join PYQs.\n3. **10 mins**: Quick self-quiz on BCNF determinants.`;
    }

    if (q.includes('ignored') || q.includes('neglected') || q.includes('productive')) {
      return `⚠️ **Subject Attention Alert**:\n- **Machine Learning (AI201B)** has only received 2 hours of study time this week compared to 7 hours on Database Systems.\n- **Recommendation**: Allocate your next focus session to Machine Learning Gradient Descent derivation.`;
    }

    if (q.includes('revision') || q.includes('plan') || q.includes('7-day')) {
      return `🎯 **7-Day Exam Revision Strategy**:\n- **Days 1-2**: Relational Schema & BCNF Decomposition\n- **Days 3-4**: PostgreSQL ACID Transactions & Indexing\n- **Days 5-6**: Solved KIET Midterm PYQs (2023-2025)\n- **Day 7**: Full Mock Assessment & Formula Review`;
    }

    return `I am your **CampusOS AI Coach**. I monitor your timetable, attendance margin, focus sessions, and course deadlines to keep your academic progress on track! Ask me anything about study plans, attendance safety, or next lectures.`;
  }
}
