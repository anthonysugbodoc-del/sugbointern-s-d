import { 
  AlertTriangle, 
  Clock, 
  User, 
  MapPin, 
  Phone,
  Expand,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient, EncounterStatus } from '@/types/clinical';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PatientHeaderProps {
  patient: Patient;
  onAddRecord: () => void;
  onToggleFocusMode: () => void;
  focusMode: boolean;
}

function getStatusConfig(status: EncounterStatus) {
  switch (status) {
    case 'admitted':
      return { label: 'Admitted', className: 'status-admitted' };
    case 'for-discharge':
      return { label: 'For Discharge', className: 'status-discharge' };
    case 'discharged':
      return { label: 'Discharged', className: 'status-discharged' };
  }
}

function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function PatientHeader({ patient, onAddRecord, onToggleFocusMode, focusMode }: PatientHeaderProps) {
  const statusConfig = getStatusConfig(patient.encounterStatus);
  const age = calculateAge(patient.dateOfBirth);
  const admissionDate = formatDate(patient.admissionDate);

  return (
    <header className="sticky top-0 z-20 bg-card border-b border-border">
      <div className="px-4 py-2.5 flex items-center gap-4">
        {/* Patient Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-base truncate">
                {patient.lastName}, {patient.firstName}
              </h1>
              <Badge variant="outline" className={cn("shrink-0", statusConfig.className)}>
                {statusConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
              <span>{patient.mrn}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{age}yo {patient.gender}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>DOB: {formatDate(patient.dateOfBirth)}</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground border-l border-border pl-4">
          {patient.room && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Room {patient.room}{patient.bed && `-${patient.bed}`}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Admitted {admissionDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{patient.attendingPhysician}</span>
          </div>
        </div>

        {/* Alerts (if critical) */}
        {patient.allergies.some(a => a.severity === 'severe') && (
          <div className="hidden md:flex items-center gap-2 border-l border-border pl-4">
            <div className="flex items-center gap-1.5 text-destructive">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-medium">
                {patient.allergies.filter(a => a.severity === 'severe').map(a => a.allergen).join(', ')}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Button 
            onClick={onAddRecord}
            size="sm" 
            className="h-8 gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Record</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleFocusMode}
          >
            <Expand className="w-3.5 h-3.5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Print Chart</DropdownMenuItem>
              <DropdownMenuItem>Share Chart</DropdownMenuItem>
              <DropdownMenuItem>View Full Demographics</DropdownMenuItem>
              <DropdownMenuItem>Request Records</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Allergy bar (if has allergies) */}
      {patient.allergies.length > 0 && (
        <div className="px-4 py-1.5 bg-alert-critical-bg border-t border-alert-critical flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-alert-critical shrink-0" />
          <span className="text-xs font-medium text-alert-critical">Allergies:</span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {patient.allergies.map((allergy) => (
              <span 
                key={allergy.id} 
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded whitespace-nowrap",
                  allergy.severity === 'severe' 
                    ? "bg-destructive/20 text-destructive font-medium" 
                    : "bg-alert-warning-bg text-alert-warning"
                )}
              >
                {allergy.allergen} ({allergy.reaction})
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
