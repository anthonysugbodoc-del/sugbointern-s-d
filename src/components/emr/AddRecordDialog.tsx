import { useState } from 'react';
import { 
  X, 
  FileText,
  Heart,
  Pill,
  ClipboardList,
  Stethoscope,
  FlaskConical,
  Image,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RecordType } from '@/types/clinical';

interface AddRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: RecordType) => void;
}

const recordTypes: { type: RecordType; icon: typeof FileText; label: string; description: string }[] = [
  { 
    type: 'vitals', 
    icon: Heart, 
    label: 'Vitals', 
    description: 'Record vital signs' 
  },
  { 
    type: 'soap-note', 
    icon: FileText, 
    label: 'SOAP Note', 
    description: 'Progress note in SOAP format' 
  },
  { 
    type: 'note', 
    icon: FileText, 
    label: 'Clinical Note', 
    description: 'General clinical documentation' 
  },
  { 
    type: 'prescription', 
    icon: Pill, 
    label: 'Prescription', 
    description: 'Medication order' 
  },
  { 
    type: 'order', 
    icon: ClipboardList, 
    label: 'Order', 
    description: 'Lab, imaging, or procedure order' 
  },
  { 
    type: 'diagnosis', 
    icon: Stethoscope, 
    label: 'Diagnosis', 
    description: 'Add or update diagnosis' 
  },
  { 
    type: 'result', 
    icon: FlaskConical, 
    label: 'Result', 
    description: 'Document test results' 
  },
  { 
    type: 'procedure', 
    icon: Stethoscope, 
    label: 'Procedure', 
    description: 'Document a procedure' 
  },
  { 
    type: 'imaging', 
    icon: Image, 
    label: 'Imaging', 
    description: 'Upload or order imaging' 
  },
  { 
    type: 'referral', 
    icon: Send, 
    label: 'Referral', 
    description: 'Create a referral' 
  },
];

export function AddRecordDialog({ open, onOpenChange, onSelectType }: AddRecordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Record</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          {recordTypes.map((item) => (
            <button
              key={item.type}
              onClick={() => {
                onSelectType(item.type);
                onOpenChange(false);
              }}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/30 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
