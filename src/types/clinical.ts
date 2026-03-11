export type EncounterStatus = 'admitted' | 'for-discharge' | 'discharged';

export type RecordType = 
  | 'soap-note' 
  | 'note' 
  | 'vitals' 
  | 'order' 
  | 'result' 
  | 'diagnosis' 
  | 'procedure' 
  | 'prescription' 
  | 'imaging' 
  | 'referral';

export interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'O';
  room?: string;
  bed?: string;
  encounterStatus: EncounterStatus;
  attendingPhysician: string;
  admissionDate: string;
  allergies: Allergy[];
  alerts: Alert[];
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export interface TimelineRecord {
  id: string;
  type: RecordType;
  title: string;
  summary: string;
  timestamp: string;
  author: string;
  facility: string;
  encounterId: string;
  status?: 'pending' | 'completed' | 'cancelled';
  details?: Record<string, unknown>;
}

export interface Vitals {
  id: string;
  timestamp: string;
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight?: number;
  height?: number;
}

export interface ImagingStudy {
  id: string;
  type: string;
  description: string;
  status: 'ordered' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  orderedDate: string;
  completedDate?: string;
  hasDicom: boolean;
  thumbnailUrl?: string;
}

export interface Referral {
  id: string;
  specialty: string;
  referredTo: string;
  reason: string;
  status: 'pending' | 'accepted' | 'scheduled' | 'completed' | 'declined';
  requestedDate: string;
  scheduledDate?: string;
  attachments: number;
}

export interface BillingSnapshot {
  totalCharges: number;
  totalPayments: number;
  balance: number;
  coverageType: 'private' | 'philhealth' | 'hmo' | 'self-pay';
  coverageProvider?: string;
  lastUpdated: string;
}

export type TimelineFilter = RecordType | 'all';
export type TimelineGrouping = 'date' | 'encounter' | 'facility';
