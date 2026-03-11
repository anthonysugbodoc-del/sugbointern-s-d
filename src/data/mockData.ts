import { 
  Patient, 
  TimelineRecord, 
  Vitals, 
  ImagingStudy, 
  Referral, 
  BillingSnapshot 
} from '@/types/clinical';

export const mockPatients: Patient[] = [
  {
    id: '1',
    mrn: 'MRN-2024-001234',
    firstName: 'Maria',
    lastName: 'Santos',
    dateOfBirth: '1985-03-15',
    gender: 'F',
    room: '302',
    bed: 'A',
    encounterStatus: 'admitted',
    attendingPhysician: 'Dr. Juan Dela Cruz',
    admissionDate: '2024-01-10T08:30:00',
    allergies: [
      { id: 'a1', allergen: 'Penicillin', reaction: 'Anaphylaxis', severity: 'severe' },
      { id: 'a2', allergen: 'Sulfa drugs', reaction: 'Rash', severity: 'moderate' },
    ],
    alerts: [
      { id: 'al1', type: 'critical', message: 'Fall risk - requires bed alarm', timestamp: '2024-01-10T09:00:00' },
      { id: 'al2', type: 'warning', message: 'NPO after midnight for procedure', timestamp: '2024-01-12T18:00:00' },
    ],
  },
  {
    id: '2',
    mrn: 'MRN-2024-001235',
    firstName: 'Jose',
    lastName: 'Reyes',
    dateOfBirth: '1972-08-22',
    gender: 'M',
    room: '415',
    bed: 'B',
    encounterStatus: 'for-discharge',
    attendingPhysician: 'Dr. Ana Garcia',
    admissionDate: '2024-01-08T14:15:00',
    allergies: [
      { id: 'a3', allergen: 'Aspirin', reaction: 'GI bleeding', severity: 'moderate' },
    ],
    alerts: [
      { id: 'al3', type: 'info', message: 'Discharge papers ready for signing', timestamp: '2024-01-12T10:00:00' },
    ],
  },
  {
    id: '3',
    mrn: 'MRN-2024-001236',
    firstName: 'Elena',
    lastName: 'Cruz',
    dateOfBirth: '1990-11-05',
    gender: 'F',
    room: '210',
    bed: 'A',
    encounterStatus: 'admitted',
    attendingPhysician: 'Dr. Miguel Torres',
    admissionDate: '2024-01-11T16:45:00',
    allergies: [],
    alerts: [],
  },
  {
    id: '4',
    mrn: 'MRN-2024-001237',
    firstName: 'Roberto',
    lastName: 'Fernandez',
    dateOfBirth: '1965-04-18',
    gender: 'M',
    encounterStatus: 'discharged',
    attendingPhysician: 'Dr. Juan Dela Cruz',
    admissionDate: '2024-01-05T10:00:00',
    allergies: [
      { id: 'a4', allergen: 'Latex', reaction: 'Contact dermatitis', severity: 'mild' },
    ],
    alerts: [],
  },
];

export const mockTimeline: TimelineRecord[] = [
  {
    id: 't1',
    type: 'soap-note',
    title: 'Daily Progress Note',
    summary: 'Patient stable, tolerating diet. Pain controlled. Continue current management.',
    timestamp: '2024-01-12T08:30:00',
    author: 'Dr. Juan Dela Cruz',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
  {
    id: 't2',
    type: 'vitals',
    title: 'Vital Signs',
    summary: 'BP 120/80, HR 72, Temp 36.8°C, RR 16, SpO2 98%',
    timestamp: '2024-01-12T07:00:00',
    author: 'RN Garcia',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
  {
    id: 't3',
    type: 'order',
    title: 'Laboratory Order',
    summary: 'CBC, BMP, Lipid Panel - Fasting',
    timestamp: '2024-01-12T06:45:00',
    author: 'Dr. Juan Dela Cruz',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'pending',
  },
  {
    id: 't4',
    type: 'result',
    title: 'Lab Results - CBC',
    summary: 'WBC 8.2, Hgb 12.5, Plt 245 - Within normal limits',
    timestamp: '2024-01-11T14:20:00',
    author: 'Lab Department',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
  {
    id: 't5',
    type: 'diagnosis',
    title: 'Diagnosis Added',
    summary: 'Community-acquired pneumonia, moderate severity',
    timestamp: '2024-01-10T09:15:00',
    author: 'Dr. Juan Dela Cruz',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
  {
    id: 't6',
    type: 'prescription',
    title: 'Medication Order',
    summary: 'Levofloxacin 750mg IV q24h x 5 days',
    timestamp: '2024-01-10T09:20:00',
    author: 'Dr. Juan Dela Cruz',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
  {
    id: 't7',
    type: 'imaging',
    title: 'Chest X-Ray PA/Lateral',
    summary: 'Right lower lobe consolidation consistent with pneumonia',
    timestamp: '2024-01-10T10:30:00',
    author: 'Dr. Radiology',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
  {
    id: 't8',
    type: 'procedure',
    title: 'IV Cannulation',
    summary: 'Right antecubital fossa, 20G catheter, no complications',
    timestamp: '2024-01-10T08:45:00',
    author: 'RN Garcia',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
  {
    id: 't9',
    type: 'note',
    title: 'Nursing Note',
    summary: 'Patient educated on incentive spirometry. Return demonstration satisfactory.',
    timestamp: '2024-01-11T10:00:00',
    author: 'RN Santos',
    facility: 'Cebu Doctors Hospital',
    encounterId: 'enc-001',
    status: 'completed',
  },
];

export const mockVitals: Vitals[] = [
  {
    id: 'v1',
    timestamp: '2024-01-12T07:00:00',
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    temperature: 36.8,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 65,
  },
  {
    id: 'v2',
    timestamp: '2024-01-12T03:00:00',
    bloodPressure: { systolic: 118, diastolic: 78 },
    heartRate: 68,
    temperature: 36.6,
    respiratoryRate: 14,
    oxygenSaturation: 99,
  },
  {
    id: 'v3',
    timestamp: '2024-01-11T23:00:00',
    bloodPressure: { systolic: 124, diastolic: 82 },
    heartRate: 74,
    temperature: 37.0,
    respiratoryRate: 18,
    oxygenSaturation: 97,
  },
];

export const mockImaging: ImagingStudy[] = [
  {
    id: 'img1',
    type: 'X-Ray',
    description: 'Chest PA/Lateral',
    status: 'completed',
    orderedDate: '2024-01-10T09:00:00',
    completedDate: '2024-01-10T10:30:00',
    hasDicom: true,
  },
  {
    id: 'img2',
    type: 'CT Scan',
    description: 'CT Chest with Contrast',
    status: 'scheduled',
    orderedDate: '2024-01-12T08:00:00',
    hasDicom: false,
  },
];

export const mockReferrals: Referral[] = [
  {
    id: 'ref1',
    specialty: 'Pulmonology',
    referredTo: 'Dr. Carlos Mendoza',
    reason: 'Evaluation for severe community-acquired pneumonia',
    status: 'scheduled',
    requestedDate: '2024-01-10T11:00:00',
    scheduledDate: '2024-01-13T09:00:00',
    attachments: 2,
  },
  {
    id: 'ref2',
    specialty: 'Physical Therapy',
    referredTo: 'PT Department',
    reason: 'Respiratory therapy and mobilization',
    status: 'pending',
    requestedDate: '2024-01-11T14:00:00',
    attachments: 0,
  },
];

export const mockBilling: BillingSnapshot = {
  totalCharges: 85450.00,
  totalPayments: 50000.00,
  balance: 35450.00,
  coverageType: 'philhealth',
  coverageProvider: 'PhilHealth',
  lastUpdated: '2024-01-12T06:00:00',
};

export const mockAISummary = `**Maria Santos** is a 38-year-old female admitted on Jan 10, 2024 with moderate community-acquired pneumonia.

**Key Points:**
• Currently stable, afebrile for 24 hours
• On Levofloxacin IV Day 3/5
• Chest X-ray shows improving right lower lobe consolidation
• Labs within normal limits

**Active Issues:**
1. CAP - improving on antibiotics
2. Fall risk - bed alarm in place

**Plan:**
• Continue current antibiotics
• Repeat chest X-ray if no improvement by Day 5
• Pulmonology consult scheduled Jan 13

**Allergies:** Penicillin (anaphylaxis), Sulfa drugs (rash)`;
