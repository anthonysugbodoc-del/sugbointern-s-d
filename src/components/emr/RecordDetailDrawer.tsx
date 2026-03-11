import { X, Clock, User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TimelineRecord } from '@/types/clinical';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface RecordDetailDrawerProps {
  record: TimelineRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDateTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function RecordDetailDrawer({ record, open, onOpenChange }: RecordDetailDrawerProps) {
  if (!record) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-lg">{record.title}</SheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-[10px] capitalize",
                    record.status === 'pending' && "text-alert-warning border-alert-warning",
                    record.status === 'completed' && "text-clinical-admitted border-clinical-admitted",
                    record.status === 'cancelled' && "text-muted-foreground"
                  )}
                >
                  {record.status || 'Documented'}
                </Badge>
                <Badge variant="secondary" className="text-[10px] capitalize">
                  {record.type.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="py-4 space-y-4">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{formatDateTime(record.timestamp)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{record.author}</span>
            </div>
            <div className="flex items-center gap-2 text-sm col-span-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{record.facility}</span>
            </div>
          </div>

          {/* Content */}
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-medium mb-2">Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {record.summary}
            </p>
          </div>

          {/* Placeholder for detailed content */}
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-medium mb-2">Details</h4>
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
              <p>Detailed record content would be displayed here based on the record type.</p>
              <p className="mt-2">This could include:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Full SOAP note sections for clinical notes</li>
                <li>Vital sign trends and graphs</li>
                <li>Order details and instructions</li>
                <li>Lab result values and reference ranges</li>
                <li>Imaging viewer for DICOM studies</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1">
              Edit Record
            </Button>
            <Button variant="outline" className="flex-1">
              Print
            </Button>
            <Button variant="outline" className="flex-1">
              Share
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
