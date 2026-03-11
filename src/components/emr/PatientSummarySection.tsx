import { useState } from 'react';
import { ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Patient } from '@/types/clinical';

interface PatientSummarySectionProps {
  patient: Patient;
  defaultOpen?: boolean;
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
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function calculateLOS(admissionDate: string): number {
  const admission = new Date(admissionDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - admission.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function PatientSummarySection({ patient, defaultOpen = true }: PatientSummarySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const age = calculateAge(patient.dateOfBirth);
  const los = calculateLOS(patient.admissionDate);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Patient Summary</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Demographics
              </p>
              <p className="text-sm mt-1">
                {age} y/o {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}
              </p>
              <p className="text-xs text-muted-foreground">
                DOB: {formatDate(patient.dateOfBirth)}
              </p>
            </div>
            
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Location
              </p>
              <p className="text-sm mt-1">
                {patient.room ? `Room ${patient.room}${patient.bed ? `-${patient.bed}` : ''}` : 'N/A'}
              </p>
              <p className="text-xs text-muted-foreground">
                Inpatient Unit
              </p>
            </div>
            
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Length of Stay
              </p>
              <p className="text-sm mt-1">
                {los} day{los !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-muted-foreground">
                Admitted: {formatDate(patient.admissionDate)}
              </p>
            </div>
            
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Attending
              </p>
              <p className="text-sm mt-1">
                {patient.attendingPhysician}
              </p>
              <p className="text-xs text-muted-foreground">
                Internal Medicine
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-clinical-admitted" />
                <span className="text-muted-foreground">Active Problems:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-timeline-order" />
                <span className="text-muted-foreground">Active Meds:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-alert-warning" />
                <span className="text-muted-foreground">Pending Orders:</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
