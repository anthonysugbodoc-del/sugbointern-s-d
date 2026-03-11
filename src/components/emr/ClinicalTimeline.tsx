import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  Filter,
  Calendar,
  Building2,
  Layers,
  FileText,
  Heart,
  Pill,
  FlaskConical,
  Stethoscope,
  Image,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TimelineRecord, RecordType, TimelineFilter, TimelineGrouping } from '@/types/clinical';

interface ClinicalTimelineProps {
  records: TimelineRecord[];
  onRecordClick: (record: TimelineRecord) => void;
  defaultOpen?: boolean;
}

const recordTypeConfig: Record<RecordType, { icon: typeof FileText; label: string; dotClass: string }> = {
  'soap-note': { icon: FileText, label: 'SOAP Note', dotClass: 'timeline-dot-note' },
  'note': { icon: FileText, label: 'Note', dotClass: 'timeline-dot-note' },
  'vitals': { icon: Heart, label: 'Vitals', dotClass: 'timeline-dot-vitals' },
  'order': { icon: ClipboardList, label: 'Order', dotClass: 'timeline-dot-order' },
  'result': { icon: FlaskConical, label: 'Result', dotClass: 'timeline-dot-result' },
  'diagnosis': { icon: Stethoscope, label: 'Diagnosis', dotClass: 'timeline-dot-diagnosis' },
  'procedure': { icon: Stethoscope, label: 'Procedure', dotClass: 'timeline-dot-procedure' },
  'prescription': { icon: Pill, label: 'Prescription', dotClass: 'timeline-dot-order' },
  'imaging': { icon: Image, label: 'Imaging', dotClass: 'timeline-dot-imaging' },
  'referral': { icon: Building2, label: 'Referral', dotClass: 'timeline-dot-note' },
};

const filterOptions: { value: TimelineFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'soap-note', label: 'SOAP' },
  { value: 'note', label: 'Notes' },
  { value: 'vitals', label: 'Vitals' },
  { value: 'order', label: 'Orders' },
  { value: 'result', label: 'Results' },
  { value: 'diagnosis', label: 'Dx' },
  { value: 'imaging', label: 'Imaging' },
];

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ClinicalTimeline({ records, onRecordClick, defaultOpen = true }: ClinicalTimelineProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [filter, setFilter] = useState<TimelineFilter>('all');
  const [grouping, setGrouping] = useState<TimelineGrouping>('date');

  const filteredRecords = records.filter(
    record => filter === 'all' || record.type === filter
  );

  // Group by date
  const groupedRecords = filteredRecords.reduce((acc, record) => {
    const dateKey = formatDate(record.timestamp);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(record);
    return acc;
  }, {} as Record<string, TimelineRecord[]>);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Clinical Timeline</span>
          <span className="text-xs text-muted-foreground">
            ({filteredRecords.length} records)
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Filters */}
          <div className="px-4 py-2 border-t border-border flex items-center gap-2 overflow-x-auto">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors",
                  filter === option.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {option.label}
              </button>
            ))}
            
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Filter className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="px-4 pb-4 max-h-[500px] overflow-y-auto">
            {Object.entries(groupedRecords).map(([date, dateRecords]) => (
              <div key={date} className="mt-4 first:mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">{date}</span>
                </div>
                
                <div className="space-y-1 ml-1 border-l-2 border-border pl-4">
                  {dateRecords.map((record) => {
                    const config = recordTypeConfig[record.type];
                    const Icon = config.icon;
                    
                    return (
                      <button
                        key={record.id}
                        onClick={() => onRecordClick(record)}
                        className="w-full text-left p-2 rounded-md hover:bg-muted/50 transition-colors group relative"
                      >
                        {/* Timeline dot */}
                        <div className={cn(
                          "absolute -left-[21px] top-3 w-2.5 h-2.5 rounded-full border-2 border-card",
                          config.dotClass
                        )} />
                        
                        <div className="flex items-start gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium truncate">{record.title}</span>
                              {record.status === 'pending' && (
                                <Badge variant="outline" className="text-[10px] px-1 py-0 text-alert-warning border-alert-warning">
                                  Pending
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {record.summary}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                              <span>{formatTime(record.timestamp)}</span>
                              <span>•</span>
                              <span>{record.author}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
