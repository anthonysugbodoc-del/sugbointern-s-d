import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle, 
  Bell,
  Sparkles,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Patient, Alert } from '@/types/clinical';

interface CriticalInfoSectionProps {
  patient: Patient;
  defaultOpen?: boolean;
}

export function CriticalInfoSection({ patient, defaultOpen = true }: CriticalInfoSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const hasContent = patient.allergies.length > 0 || patient.alerts.length > 0;
  
  if (!hasContent) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="font-medium text-sm">Critical Information</span>
          <span className="text-xs text-muted-foreground">
            ({patient.allergies.length} allergies, {patient.alerts.length} alerts)
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-3 space-y-3">
          {/* Allergies */}
          {patient.allergies.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy) => (
                  <div
                    key={allergy.id}
                    className={cn(
                      "px-2.5 py-1.5 rounded-md text-xs border",
                      allergy.severity === 'severe'
                        ? "alert-critical border-alert-critical"
                        : allergy.severity === 'moderate'
                        ? "alert-warning border-alert-warning"
                        : "bg-muted text-muted-foreground border-border"
                    )}
                  >
                    <span className="font-medium">{allergy.allergen}</span>
                    <span className="text-[10px] ml-1 opacity-75">({allergy.reaction})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Alerts */}
          {patient.alerts.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Active Alerts</p>
              <div className="space-y-1.5">
                {patient.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "px-3 py-2 rounded-md text-xs flex items-start gap-2",
                      alert.type === 'critical' && "alert-critical",
                      alert.type === 'warning' && "alert-warning",
                      alert.type === 'info' && "bg-alert-info-bg text-alert-info"
                    )}
                  >
                    <Bell className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{alert.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface AISummarySectionProps {
  summary: string;
  defaultOpen?: boolean;
}

export function AISummarySection({ summary, defaultOpen = false }: AISummarySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-accent to-accent/50 rounded-lg border border-primary/20 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm text-primary">AI Patient Summary</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">Beta</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="bg-card rounded-md p-3 text-sm prose prose-sm max-w-none">
            {summary.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={i} className="font-semibold text-sm mt-2 mb-1">{line.replace(/\*\*/g, '')}</h4>;
              }
              if (line.startsWith('•')) {
                return <p key={i} className="text-xs text-muted-foreground ml-2">{line}</p>;
              }
              if (line.match(/^\d\./)) {
                return <p key={i} className="text-xs ml-2">{line}</p>;
              }
              return line ? <p key={i} className="text-xs">{line}</p> : null;
            })}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            AI-generated summary. Always verify with full chart review.
          </p>
        </div>
      )}
    </div>
  );
}
