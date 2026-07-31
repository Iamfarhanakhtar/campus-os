import React, { useState } from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useTheme } from '../../../hooks/useTheme';
import { ThemeMode } from '../../../constants/theme';
import { useAuth } from '../../../hooks/useAuth';
import { Settings, Moon, Sun, Laptop, ShieldCheck, Calendar, Save, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const {
    academicPreferences,
    semesterSettings,
    updateAcademicPreferences,
    updateSemesterSettings,
  } = useAuth();

  const [minAttendance, setMinAttendance] = useState(academicPreferences.min_attendance_percentage);
  const [targetAttendance, setTargetAttendance] = useState(academicPreferences.target_attendance_percentage);
  const [semesterData, setSemesterData] = useState({
    semester: semesterSettings.semester,
    academic_session: semesterSettings.academic_session,
    start_date: semesterSettings.start_date,
    end_date: semesterSettings.end_date,
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleSaveAcademicPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateAcademicPreferences({
      min_attendance_percentage: Number(minAttendance),
      target_attendance_percentage: Number(targetAttendance),
    });
    triggerSavedNotice('Academic attendance targets updated successfully.');
  };

  const handleSaveSemesterConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSemesterSettings({
      semester: Number(semesterData.semester),
      academic_session: semesterData.academic_session,
      start_date: semesterData.start_date,
      end_date: semesterData.end_date,
    });
    triggerSavedNotice('Semester settings updated successfully.');
  };

  const triggerSavedNotice = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Settings"
        description="Configure academic safeguards, attendance targets, semester timelines, and visual appearance."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <Settings className="mr-1.5 h-3.5 w-3.5" /> System Configuration
          </Badge>
        }
      />

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <span>{savedMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Preferences Card */}
          <Card glass>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#7C5CFC]" /> Academic Attendance Preferences
              </CardTitle>
              <CardDescription>
                Central attendance threshold targets used for safe buffer calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAcademicPreferences} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Minimum Required Attendance (%)
                    </label>
                    <Input
                      type="number"
                      min={50}
                      max={100}
                      required
                      value={minAttendance}
                      onChange={(e) => setMinAttendance(Number(e.target.value))}
                      className="font-mono"
                    />
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Safe boundary minimum (e.g. 75% university requirement).
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Target Attendance Goal (%)
                    </label>
                    <Input
                      type="number"
                      min={50}
                      max={100}
                      required
                      value={targetAttendance}
                      onChange={(e) => setTargetAttendance(Number(e.target.value))}
                      className="font-mono"
                    />
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Personal target goal (e.g. 85% recommended buffer).
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="default" size="sm">
                    <Save className="mr-1.5 h-3.5 w-3.5" /> Save Attendance Targets
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Semester Settings Card */}
          <Card glass>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#7C5CFC]" /> Semester Timeline Settings
              </CardTitle>
              <CardDescription>
                Configure active term details and session dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSemesterConfig} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Current Semester
                    </label>
                    <Input
                      type="number"
                      min={1}
                      max={12}
                      required
                      value={semesterData.semester}
                      onChange={(e) => setSemesterData({ ...semesterData, semester: Number(e.target.value) })}
                      className="font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Academic Session
                    </label>
                    <Input
                      type="text"
                      required
                      value={semesterData.academic_session}
                      onChange={(e) => setSemesterData({ ...semesterData, academic_session: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Semester Start Date
                    </label>
                    <Input
                      type="date"
                      required
                      value={semesterData.start_date}
                      onChange={(e) => setSemesterData({ ...semesterData, start_date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Semester End Date
                    </label>
                    <Input
                      type="date"
                      required
                      value={semesterData.end_date}
                      onChange={(e) => setSemesterData({ ...semesterData, end_date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="default" size="sm">
                    <Save className="mr-1.5 h-3.5 w-3.5" /> Save Semester Timeline
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Appearance Card */}
          <Card glass>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sun className="h-5 w-5 text-[#7C5CFC]" /> Appearance & Interface
              </CardTitle>
              <CardDescription>
                Customize CampusOS visual theme and layout preference
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                  Theme Mode
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Dark Mode', icon: Moon },
                    { id: 'light', label: 'Light Mode', icon: Sun },
                    { id: 'system', label: 'System', icon: Laptop },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const isSelected = theme === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setTheme(mode.id as ThemeMode)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-[#7C5CFC] bg-[#7C5CFC]/10 text-white font-semibold'
                            : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        <Icon className="h-5 w-5 mb-2" />
                        <span className="text-xs">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Info Box */}
        <div className="space-y-6">
          <Card className="bg-[#18181B] border-zinc-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#7C5CFC]" /> Active Safeguards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-zinc-400">
              <div className="rounded-lg bg-zinc-900 p-3 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Minimum Attendance:</span>
                  <span className="font-mono font-semibold text-amber-400">{academicPreferences.min_attendance_percentage}%</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Target Goal:</span>
                  <span className="font-mono font-semibold text-emerald-400">{academicPreferences.target_attendance_percentage}%</span>
                </div>
              </div>
              <p className="text-[11px]">
                These thresholds will be automatically evaluated against subject attendance records in future calculations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
