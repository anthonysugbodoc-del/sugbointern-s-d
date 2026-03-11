import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NavRail } from './NavRail';
import { PatientList } from './PatientList';
import { ChartWorkspace } from './ChartWorkspace';
import { mockPatients } from '@/data/mockData';
import { Patient } from '@/types/clinical';

export function EMRLayout() {
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [patientListCollapsed, setPatientListCollapsed] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0]);

  const handleToggleFocusMode = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      setPatientListCollapsed(true);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Navigation Rail */}
      <NavRail 
        collapsed={navCollapsed} 
        onToggle={() => setNavCollapsed(!navCollapsed)} 
      />

      {/* Patient List */}
      {!focusMode && (
        <PatientList
          patients={mockPatients}
          selectedPatientId={selectedPatient?.id || null}
          onSelectPatient={setSelectedPatient}
          collapsed={patientListCollapsed}
          onToggle={() => setPatientListCollapsed(!patientListCollapsed)}
        />
      )}

      {/* Main Chart Workspace */}
      {selectedPatient ? (
        <ChartWorkspace 
          patient={selectedPatient}
          focusMode={focusMode}
          onToggleFocusMode={handleToggleFocusMode}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-muted-foreground">Select a patient to view their chart</p>
          </div>
        </div>
      )}
    </div>
  );
}
