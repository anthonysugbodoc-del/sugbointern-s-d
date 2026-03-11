import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Patient, TimelineRecord, RecordType } from '@/types/clinical';
import { PatientHeader } from './PatientHeader';
import { ChartTabs, ChartTab } from './ChartTabs';
import { CriticalInfoSection, AISummarySection } from './CriticalInfoSection';
import { PatientSummarySection } from './PatientSummarySection';
import { VitalsSection } from './VitalsSection';
import { ClinicalTimeline } from './ClinicalTimeline';
import { ImagingSection } from './ImagingSection';
import { ReferralsSection } from './ReferralsSection';
import { BillingSection } from './BillingSection';
import { AddRecordDialog } from './AddRecordDialog';
import { RecordDetailDrawer } from './RecordDetailDrawer';
import { 
  mockTimeline, 
  mockVitals, 
  mockImaging, 
  mockReferrals, 
  mockBilling,
  mockAISummary 
} from '@/data/mockData';

interface ChartWorkspaceProps {
  patient: Patient;
  focusMode: boolean;
  onToggleFocusMode: () => void;
}

export function ChartWorkspace({ patient, focusMode, onToggleFocusMode }: ChartWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<ChartTab>('overview');
  const [addRecordOpen, setAddRecordOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TimelineRecord | null>(null);
  const [recordDrawerOpen, setRecordDrawerOpen] = useState(false);

  const handleRecordClick = (record: TimelineRecord) => {
    setSelectedRecord(record);
    setRecordDrawerOpen(true);
  };

  const handleAddRecord = (type: RecordType) => {
    // In a real app, this would open a form for the specific record type
    console.log('Add record of type:', type);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Patient Header */}
      <PatientHeader 
        patient={patient}
        onAddRecord={() => setAddRecordOpen(true)}
        onToggleFocusMode={onToggleFocusMode}
        focusMode={focusMode}
      />

      {/* Chart Tabs */}
      <ChartTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4 max-w-6xl">
            {/* Critical Information */}
            <CriticalInfoSection patient={patient} />

            {/* AI Summary */}
            <AISummarySection summary={mockAISummary} />

            {/* Patient Summary */}
            <PatientSummarySection patient={patient} />

            {/* Vitals */}
            <VitalsSection vitals={mockVitals} />

            {/* Clinical Timeline */}
            <ClinicalTimeline 
              records={mockTimeline} 
              onRecordClick={handleRecordClick}
            />

            {/* Imaging Studies */}
            <ImagingSection 
              studies={mockImaging}
              onStudyClick={(study) => console.log('View study:', study)}
            />

            {/* Referrals */}
            <ReferralsSection 
              referrals={mockReferrals}
              onReferralClick={(referral) => console.log('View referral:', referral)}
            />

            {/* Billing */}
            <BillingSection billing={mockBilling} />
          </div>
        )}

        {activeTab === 'notes-orders' && (
          <div className="max-w-4xl">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">Notes & Orders</h3>
              <p className="text-muted-foreground text-sm">
                This tab would contain a comprehensive view of all clinical notes and orders, 
                with advanced filtering, search, and documentation tools.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-4xl">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">Patient History</h3>
              <p className="text-muted-foreground text-sm">
                This tab would display the complete patient history including past encounters, 
                medical history, surgical history, family history, and social history.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-4xl">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">Administrative</h3>
              <p className="text-muted-foreground text-sm">
                This tab would contain administrative functions like consent forms, 
                insurance verification, discharge planning, and demographic updates.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Record Dialog */}
      <AddRecordDialog 
        open={addRecordOpen}
        onOpenChange={setAddRecordOpen}
        onSelectType={handleAddRecord}
      />

      {/* Record Detail Drawer */}
      <RecordDetailDrawer 
        record={selectedRecord}
        open={recordDrawerOpen}
        onOpenChange={setRecordDrawerOpen}
      />
    </div>
  );
}
