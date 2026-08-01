import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { RiskLevel } from '../../../engines/attendance';
import { ShieldCheck, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export interface AttendanceStatusBadgeProps {
  riskLevel: RiskLevel;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = React.memo(({ riskLevel }) => {
  switch (riskLevel) {
    case 'perfect':
      return (
        <Badge variant="success" className="py-0.5 px-2.5 text-[10px] font-bold uppercase tracking-wider">
          <CheckCircle2 className="mr-1 h-3 w-3" /> EXCELLENT
        </Badge>
      );
    case 'safe':
      return (
        <Badge variant="default" className="py-0.5 px-2.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border-indigo-500/30">
          <ShieldCheck className="mr-1 h-3 w-3" /> SAFE
        </Badge>
      );
    case 'warning':
      return (
        <Badge variant="warning" className="py-0.5 px-2.5 text-[10px] font-bold uppercase tracking-wider">
          <AlertTriangle className="mr-1 h-3 w-3" /> WARNING
        </Badge>
      );
    case 'critical':
      return (
        <Badge variant="danger" className="py-0.5 px-2.5 text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="mr-1 h-3 w-3" /> CRITICAL
        </Badge>
      );
  }
});

AttendanceStatusBadge.displayName = 'AttendanceStatusBadge';
