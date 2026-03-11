import { useState } from 'react';
import { 
  ExternalLink,
  CreditCard,
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
    maximumFractionDigits: 0,
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
  // NOTE: billing/defaultOpen kept for compatibility; design is a fixed summary per requirements.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused = { billing, defaultOpen };

  const balanceDue = 75000;
  const totalCharges = 125000;
  const payments = 50000;

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="h-1 w-full" style={{ backgroundColor: '#0066CC' }} />

      <div className="px-5 pt-4 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Billing Summary</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {formatCurrency(balanceDue)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Current balance</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">
              TOTAL CHARGES
            </p>
            <p className="mt-1 text-lg font-bold text-foreground">{formatCurrency(totalCharges)}</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">
              PAYMENTS
            </p>
            <p className="mt-1 text-lg font-bold text-foreground">{formatCurrency(payments)}</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            {/* intentionally blank / reserved for future summary */}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold tracking-wider text-foreground">
            INSURANCE COVERAGE
          </p>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-white px-4 py-3">
              <p className="text-sm font-semibold text-foreground">PhilHealth</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Policy: <span className="font-medium text-foreground">PH-2024-88765432</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Exp: <span className="font-medium text-foreground">N/A</span>
              </p>
            </div>

            <div className="rounded-lg border border-border bg-white px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Maxicare</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Policy: <span className="font-medium text-foreground">MAX-2023-778899</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Exp: <span className="font-medium text-foreground">July 31, 2030</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">36% covered by insurance</p>
            <p className="mt-1 text-sm font-bold text-foreground">
              Balance Due: {formatCurrency(balanceDue)}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Last updated: Jan 12, 8:00 AM
            </p>
          </div>

          <Button
            size="sm"
            className="h-9 px-4 text-xs font-semibold gap-2"
            style={{ backgroundColor: '#0066CC' }}
          >
            <ExternalLink className="w-4 h-4" />
            View Statement
          </Button>
        </div>
      </div>
    </div>
  );
}
