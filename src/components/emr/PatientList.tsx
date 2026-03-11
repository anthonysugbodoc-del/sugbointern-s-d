import { useState } from 'react';
import { Search, ChevronLeft, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient, EncounterStatus } from '@/types/clinical';

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelectPatient: (patient: Patient) => void;
  collapsed: boolean;
  onToggle: () => void;
}

function getStatusBadge(status: EncounterStatus) {
  switch (status) {
    case 'admitted':
      return <Badge variant="outline" className="status-admitted text-[10px] px-1.5 py-0">Admitted</Badge>;
    case 'for-discharge':
      return <Badge variant="outline" className="status-discharge text-[10px] px-1.5 py-0">For D/C</Badge>;
    case 'discharged':
      return <Badge variant="outline" className="status-discharged text-[10px] px-1.5 py-0">Discharged</Badge>;
  }
}

export function PatientList({ 
  patients, 
  selectedPatientId, 
  onSelectPatient, 
  collapsed,
  onToggle 
}: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<EncounterStatus | 'all'>('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || patient.encounterStatus === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="h-screen w-8 bg-card border-r border-border flex items-center justify-center hover:bg-muted transition-colors"
      >
        <ChevronLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="w-patient-list h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="h-header-height px-3 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold text-sm">Worklist</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Filter className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onToggle}>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-8 text-xs"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-2 border-b border-border">
        {(['all', 'admitted', 'for-discharge', 'discharged'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={cn(
              "px-2 py-1 rounded text-[10px] font-medium transition-colors",
              filterStatus === status
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {status === 'all' ? 'All' : status === 'for-discharge' ? 'D/C' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Patient list */}
      <div className="flex-1 overflow-y-auto">
        {filteredPatients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={cn(
              "w-full p-3 text-left border-b border-border transition-colors",
              selectedPatientId === patient.id
                ? "bg-accent"
                : "hover:bg-muted/50"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">
                  {patient.lastName}, {patient.firstName}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {patient.mrn}
                </p>
              </div>
              {getStatusBadge(patient.encounterStatus)}
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
              {patient.room && (
                <span className="bg-muted px-1.5 py-0.5 rounded">
                  Rm {patient.room}{patient.bed && `-${patient.bed}`}
                </span>
              )}
              <span>{patient.attendingPhysician}</span>
            </div>

            {patient.allergies.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-[10px] font-medium text-destructive">
                  ⚠ {patient.allergies.length} allerg{patient.allergies.length > 1 ? 'ies' : 'y'}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="p-2 border-t border-border">
        <p className="text-[11px] text-muted-foreground text-center">
          {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
