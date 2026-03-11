import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  CreditCard,
  ExternalLink,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BillingSnapshot } from '@/types/clinical';

interface BillingSectionProps {
  billing: BillingSnapshot;
  defaultOpen?: boolean;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getCoverageIcon(type: BillingSnapshot['coverageType']) {
  switch (type) {
    case 'philhealth':
      return '🏥';
    case 'hmo':
      return '🛡️';
    case 'private':
      return '💳';
    case 'self-pay':
      return '💰';
  }
}

export function BillingSection({ billing, defaultOpen = false }: BillingSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Billing & Coverage</span>
          <span className="text-xs text-muted-foreground">
            Balance: {formatCurrency(billing.balance)}
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Total Charges
              </p>
              <p className="text-sm font-semibold mt-1">
                {formatCurrency(billing.totalCharges)}
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Payments
              </p>
              <p className="text-sm font-semibold mt-1 text-clinical-admitted">
                {formatCurrency(billing.totalPayments)}
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-alert-warning-bg border border-alert-warning">
              <p className="text-[10px] font-medium text-alert-warning uppercase tracking-wide">
                Balance Due
              </p>
              <p className="text-sm font-semibold mt-1 text-alert-warning">
                {formatCurrency(billing.balance)}
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-accent border border-primary/20">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Coverage
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span>{getCoverageIcon(billing.coverageType)}</span>
                <span className="text-sm font-medium text-primary">
                  {billing.coverageProvider || billing.coverageType.charAt(0).toUpperCase() + billing.coverageType.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground">
              Last updated: {formatDate(billing.lastUpdated)}
            </p>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
              <ExternalLink className="w-3 h-3" />
              View Statement
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
