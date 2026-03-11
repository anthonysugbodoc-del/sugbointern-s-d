import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Referral } from '@/types/clinical';

interface ReferralsSectionProps {
  referrals: Referral[];
  defaultOpen?: boolean;
  onReferralClick: (referral: Referral) => void;
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getStatusConfig(status: Referral['status']) {
  switch (status) {
    case 'completed':
      return { icon: CheckCircle2, label: 'Completed', className: 'text-clinical-admitted bg-clinical-admitted-bg' };
    case 'scheduled':
      return { icon: Calendar, label: 'Scheduled', className: 'text-alert-info bg-alert-info-bg' };
    case 'accepted':
      return { icon: CheckCircle2, label: 'Accepted', className: 'text-primary bg-accent' };
    case 'pending':
      return { icon: Clock, label: 'Pending', className: 'text-alert-warning bg-alert-warning-bg' };
    case 'declined':
      return { icon: XCircle, label: 'Declined', className: 'text-destructive bg-destructive/10' };
  }
}

export function ReferralsSection({ referrals, defaultOpen = true, onReferralClick }: ReferralsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (referrals.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Referrals</span>
          <span className="text-xs text-muted-foreground">
            ({referrals.length} referral{referrals.length === 1 ? '' : 's'})
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-2">
          {referrals.map((referral) => {
            const statusConfig = getStatusConfig(referral.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <button
                key={referral.id}
                onClick={() => onReferralClick(referral)}
                className="w-full p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{referral.specialty}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Referred to: {referral.referredTo}
                    </p>
                    <p className="text-xs mt-1 line-clamp-1">
                      {referral.reason}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                      <span>Requested: {formatDate(referral.requestedDate)}</span>
                      {referral.scheduledDate && (
                        <>
                          <span>•</span>
                          <span className="text-alert-info font-medium">
                            Scheduled: {formatDate(referral.scheduledDate)}
                          </span>
                        </>
                      )}
                      {referral.attachments > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Paperclip className="w-3 h-3" />
                            {referral.attachments} attachment{referral.attachments > 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <span className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium shrink-0",
                    statusConfig.className
                  )}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
