import React from 'react';
import { Dialog } from '../../../components/ui/Dialog';
import { useNotifications } from '../context/NotificationContext';
import { Bell, ShieldCheck, CheckSquare, Clock, AlertTriangle, Sparkles } from 'lucide-react';

export const NotificationPreferencesModal: React.FC = () => {
  const { isPreferencesOpen, closePreferences, preferences, updatePreferences } = useNotifications();

  const items = [
    { key: 'attendanceAlerts', label: 'Attendance Safety Alerts', desc: 'Real-time warning when attendance drops near 75%', icon: <ShieldCheck className="h-4 w-4 text-emerald-400" /> },
    { key: 'examReminders', label: 'Exam & MSE Reminders', desc: 'Countdown alerts for upcoming midterms & quizzes', icon: <CheckSquare className="h-4 w-4 text-[#7C5CFC]" /> },
    { key: 'aiRecommendations', label: 'CampusOS AI Recommendations', desc: 'Personalized course study & weak topic suggestions', icon: <Sparkles className="h-4 w-4 text-[#7C5CFC]" /> },
    { key: 'timetableReminders', label: 'Timetable & Class Alerts', desc: '15-minute advance notification before lectures start', icon: <Clock className="h-4 w-4 text-sky-400" /> },
    { key: 'focusReminders', label: 'Free Slot Focus Reminders', desc: 'Proactive focus window suggestions during free periods', icon: <Clock className="h-4 w-4 text-amber-400" /> },
    { key: 'deadlineAlerts', label: 'Coursework Deadline Alerts', desc: 'Urgent alerts 24 hours before assignment deadlines', icon: <AlertTriangle className="h-4 w-4 text-rose-400" /> },
  ] as const;

  return (
    <Dialog isOpen={isPreferencesOpen} onClose={closePreferences} title="Notification & Reminder Settings">
      <div className="space-y-4 font-mono text-xs text-white">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-[#7C5CFC]/15 border border-[#7C5CFC]/30">
          <Bell className="h-4 w-4 text-[#7C5CFC]" />
          <p className="text-[11px] text-zinc-300">
            Customize which proactive alerts and AI reminders appear in your CampusOS communication center.
          </p>
        </div>

        <div className="space-y-2">
          {items.map((item) => {
            const isChecked = preferences[item.key];
            return (
              <div
                key={item.key}
                onClick={() => updatePreferences({ [item.key]: !isChecked })}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start gap-2.5">
                  <span className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <h5 className="font-bold text-white text-xs">{item.label}</h5>
                    <p className="text-[10px] text-zinc-400">{item.desc}</p>
                  </div>
                </div>

                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    isChecked ? 'bg-[#7C5CFC]' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      isChecked ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};
