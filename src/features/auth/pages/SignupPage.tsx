import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { ROUTES } from '../../../constants/routes';
import { Mail, Lock, User, GraduationCap, ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [university, setUniversity] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(ROUTES.DASHBOARD);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFC]/10 via-transparent to-transparent pointer-events-none" />
      
      <Card glass className="w-full max-w-md border-zinc-800 shadow-2xl relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7C5CFC] to-indigo-500 text-white font-bold text-xl shadow-lg shadow-[#7C5CFC]/30">
            C
          </div>
          <CardTitle className="text-2xl font-bold text-white">Create your account</CardTitle>
          <CardDescription className="text-zinc-400 text-xs">
            Initialize your student operating system workspace
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Full Name
              </label>
              <Input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={<User className="h-4 w-4" />}
                placeholder="Alex Morgan"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                University Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
                placeholder="alex@stanford.edu"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                University / Institution
              </label>
              <Input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                icon={<GraduationCap className="h-4 w-4" />}
                placeholder="Stanford University"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Password
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
                placeholder="At least 8 characters"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-zinc-800/80 pt-4">
          <p className="text-xs text-zinc-400">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-semibold text-[#7C5CFC] hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
