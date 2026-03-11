import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  Image,
  ExternalLink,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImagingStudy } from '@/types/clinical';

interface ImagingSectionProps {
  studies: ImagingStudy[];
  defaultOpen?: boolean;
  onStudyClick: (study: ImagingStudy) => void;
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getStatusConfig(status: ImagingStudy['status']) {
  switch (status) {
    case 'completed':
      return { icon: CheckCircle2, label: 'Completed', className: 'text-clinical-admitted bg-clinical-admitted-bg' };
    case 'scheduled':
      return { icon: Clock, label: 'Scheduled', className: 'text-alert-info bg-alert-info-bg' };
    case 'ordered':
      return { icon: Clock, label: 'Ordered', className: 'text-alert-warning bg-alert-warning-bg' };
    case 'in-progress':
      return { icon: AlertCircle, label: 'In Progress', className: 'text-primary bg-accent' };
    case 'cancelled':
      return { icon: AlertCircle, label: 'Cancelled', className: 'text-muted-foreground bg-muted' };
  }
}

export function ImagingSection({ studies, defaultOpen = true, onStudyClick }: ImagingSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (studies.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Image className="w-4 h-4 text-timeline-imaging" />
          <span className="font-medium text-sm">Imaging Studies</span>
          <span className="text-xs text-muted-foreground">
            ({studies.length} stud{studies.length === 1 ? 'y' : 'ies'})
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
          {studies.map((study) => {
            const statusConfig = getStatusConfig(study.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <button
                key={study.id}
                onClick={() => onStudyClick(study)}
                className="w-full p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0">
                      <Image className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{study.type}</span>
                        {study.hasDicom && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            DICOM
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {study.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Ordered: {formatDate(study.orderedDate)}
                        {study.completedDate && ` • Completed: ${formatDate(study.completedDate)}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium",
                      statusConfig.className
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                    {study.status === 'completed' && study.hasDicom && (
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
