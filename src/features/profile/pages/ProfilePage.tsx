import React, { useState } from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Dialog } from '../../../components/ui/Dialog';
import { useAuth } from '../../../hooks/useAuth';
import {
  User,
  BookOpen,
  Layers,
  Calendar,
  Edit3,
  Building,
  Hash,
  Clock,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    student,
    workspace,
    semesterSettings,
    updateStudent,
    updateWorkspace,
    updateSemesterSettings,
  } = useAuth();

  // Modal States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditWorkspaceOpen, setIsEditWorkspaceOpen] = useState(false);
  const [isEditSemesterOpen, setIsEditSemesterOpen] = useState(false);

  // Form States
  const [profileForm, setProfileForm] = useState({
    full_name: student.full_name,
    avatar_url: student.avatar_url || '',
    college: student.college,
    branch: student.branch,
    section: student.section,
    semester: student.semester,
    academic_session: student.academic_session,
  });

  const [workspaceNameForm, setWorkspaceNameForm] = useState(workspace.name);

  const [semesterForm, setSemesterForm] = useState({
    semester: semesterSettings.semester,
    academic_session: semesterSettings.academic_session,
    start_date: semesterSettings.start_date,
    end_date: semesterSettings.end_date,
  });

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent(profileForm);
    setIsEditProfileOpen(false);
  };

  // Handle Workspace Save
  const handleSaveWorkspace = () => {
    updateWorkspace({ name: workspaceNameForm });
    setIsEditWorkspaceOpen(false);
  };

  // Handle Semester Settings Save
  const handleSaveSemester = (e: React.FormEvent) => {
    e.preventDefault();
    updateSemesterSettings(semesterForm);
    // Sync student semester & session as well
    updateStudent({
      semester: semesterForm.semester,
      academic_session: semesterForm.academic_session,
    });
    setIsEditSemesterOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Identity & Workspace"
        description="Manage your student credentials, personal workspace, and semester configuration."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <User className="mr-1.5 h-3.5 w-3.5" /> Identity & Settings
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Student Profile Overview Card */}
        <Card glass className="lg:col-span-1 border-zinc-800">
          <CardContent className="p-6 text-center">
            <Avatar
              src={student.avatar_url}
              fallback={student.full_name}
              size="xl"
              className="mx-auto border-2 border-[#7C5CFC]/40 mb-4 shadow-xl"
            />
            <h2 className="text-xl font-bold text-white">{student.full_name}</h2>
            <p className="text-xs text-zinc-400 mt-0.5">{student.email}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="default" className="py-1">
                Semester {student.semester}
              </Badge>
              <Badge variant="secondary" className="py-1">
                Section {student.section}
              </Badge>
              <Badge variant="outline" className="py-1 text-zinc-300">
                {student.academic_session}
              </Badge>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-left space-y-3 text-xs text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#7C5CFC]" /> Institution
                </span>
                <span className="text-white font-medium truncate max-w-[180px]" title={student.college}>
                  {student.college}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#7C5CFC]" /> Branch
                </span>
                <span className="text-white font-medium">{student.branch}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-[#7C5CFC]" /> Section
                </span>
                <span className="text-white font-medium">Section {student.section}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                setProfileForm({
                  full_name: student.full_name,
                  avatar_url: student.avatar_url || '',
                  college: student.college,
                  branch: student.branch,
                  section: student.section,
                  semester: student.semester,
                  academic_session: student.academic_session,
                });
                setIsEditProfileOpen(true);
              }}
              variant="outline"
              className="w-full mt-6 text-xs text-zinc-200"
            >
              <Edit3 className="mr-2 h-3.5 w-3.5" /> Edit Profile Details
            </Button>
          </CardContent>
        </Card>

        {/* Right Column: Workspace & Semester Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workspace Section */}
          <Card glass>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#7C5CFC]" /> Personal Workspace
                </CardTitle>
                <CardDescription>
                  Centralized workspace for your academic notes, schedule, and goals
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setWorkspaceNameForm(workspace.name);
                  setIsEditWorkspaceOpen(true);
                }}
                className="text-xs text-[#7C5CFC]"
              >
                <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Rename
              </Button>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-xl bg-[#7C5CFC]/15 p-3 text-[#7C5CFC] border border-[#7C5CFC]/30">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{workspace.name}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Active Personal Workspace • Single User Architecture
                    </p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Semester Settings Section */}
          <Card glass>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#7C5CFC]" /> Semester Configuration
                </CardTitle>
                <CardDescription>
                  Academic term dates and session settings
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSemesterForm({
                    semester: semesterSettings.semester,
                    academic_session: semesterSettings.academic_session,
                    start_date: semesterSettings.start_date,
                    end_date: semesterSettings.end_date,
                  });
                  setIsEditSemesterOpen(true);
                }}
                className="text-xs text-[#7C5CFC]"
              >
                <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit Semester
              </Button>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-4">
                  <p className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                    Current Semester
                  </p>
                  <p className="text-base font-bold text-white mt-1">
                    Semester {semesterSettings.semester}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Session {semesterSettings.academic_session}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-4">
                  <p className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                    Term Duration
                  </p>
                  <p className="text-xs font-semibold text-white mt-1.5 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" />
                    {semesterSettings.start_date} to {semesterSettings.end_date}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Used for timetable & attendance calculations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Student Profile Modal */}
      <Dialog
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Student Profile"
        description="Update your personal student credentials and institutional details."
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Full Name
            </label>
            <Input
              type="text"
              required
              value={profileForm.full_name}
              onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Profile Photo URL
            </label>
            <Input
              type="text"
              placeholder="https://..."
              value={profileForm.avatar_url}
              onChange={(e) => setProfileForm({ ...profileForm, avatar_url: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                College / Institution
              </label>
              <Input
                type="text"
                required
                value={profileForm.college}
                onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Branch / Specialization
              </label>
              <Input
                type="text"
                required
                value={profileForm.branch}
                onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Section
              </label>
              <Input
                type="text"
                required
                value={profileForm.section}
                onChange={(e) => setProfileForm({ ...profileForm, section: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Semester
              </label>
              <Input
                type="number"
                min={1}
                max={12}
                required
                value={profileForm.semester}
                onChange={(e) => setProfileForm({ ...profileForm, semester: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Session
              </label>
              <Input
                type="text"
                required
                value={profileForm.academic_session}
                onChange={(e) => setProfileForm({ ...profileForm, academic_session: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsEditProfileOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Rename Workspace Modal */}
      <Dialog
        isOpen={isEditWorkspaceOpen}
        onClose={() => setIsEditWorkspaceOpen(false)}
        title="Rename Workspace"
        description="Update your personal workspace display name."
      >
        <form onSubmit={handleSaveWorkspace} className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Workspace Name
            </label>
            <Input
              type="text"
              required
              value={workspaceNameForm}
              onChange={(e) => setWorkspaceNameForm(e.target.value)}
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsEditWorkspaceOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save Workspace Name
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Edit Semester Modal */}
      <Dialog
        isOpen={isEditSemesterOpen}
        onClose={() => setIsEditSemesterOpen(false)}
        title="Edit Semester Settings"
        description="Configure academic term start and end dates."
      >
        <form onSubmit={handleSaveSemester} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Semester Number
              </label>
              <Input
                type="number"
                min={1}
                max={12}
                required
                value={semesterForm.semester}
                onChange={(e) => setSemesterForm({ ...semesterForm, semester: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Academic Session
              </label>
              <Input
                type="text"
                required
                value={semesterForm.academic_session}
                onChange={(e) => setSemesterForm({ ...semesterForm, academic_session: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Term Start Date
              </label>
              <Input
                type="date"
                required
                value={semesterForm.start_date}
                onChange={(e) => setSemesterForm({ ...semesterForm, start_date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Term End Date
              </label>
              <Input
                type="date"
                required
                value={semesterForm.end_date}
                onChange={(e) => setSemesterForm({ ...semesterForm, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsEditSemesterOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save Semester Config
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
