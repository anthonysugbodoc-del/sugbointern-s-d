import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Vitals } from '@/types/clinical';

interface VitalsSectionProps {
  vitals: Vitals[];
  defaultOpen?: boolean;
}

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
  });
}

interface VitalCardProps {
  label: string;
  value: string;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  isAbnormal?: boolean;
}

function VitalCard({ label, value, unit, trend, isAbnormal }: VitalCardProps) {
  return (
    <div className={cn(
      "p-3 rounded-lg border",
      isAbnormal ? "bg-alert-warning-bg border-alert-warning" : "bg-muted/30 border-border"
    )}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        {trend && (
          <span className={cn(
            "w-4 h-4",
            trend === 'up' && "text-destructive",
            trend === 'down' && "text-clinical-admitted",
            trend === 'stable' && "text-muted-foreground"
          )}>
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
            {trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn(
          "text-lg font-semibold",
          isAbnormal && "text-alert-warning"
        )}>
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

export function VitalsSection({ vitals, defaultOpen = true }: VitalsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const latestVitals = vitals[0];
  const previousVitals = vitals[1];

  if (!latestVitals) return null;

  const getTrend = (current: number, previous?: number): 'up' | 'down' | 'stable' => {
    if (!previous) return 'stable';
    if (current > previous * 1.05) return 'up';
    if (current < previous * 0.95) return 'down';
    return 'stable';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-clinical-admitted" />
          <span className="font-medium text-sm">Latest Vitals</span>
          <span className="text-xs text-muted-foreground">
            {formatDate(latestVitals.timestamp)} at {formatTime(latestVitals.timestamp)}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
            <VitalCard
              label="Blood Pressure"
              value={`${latestVitals.bloodPressure.systolic}/${latestVitals.bloodPressure.diastolic}`}
              unit="mmHg"
              trend={getTrend(
                latestVitals.bloodPressure.systolic,
                previousVitals?.bloodPressure.systolic
              )}
              isAbnormal={latestVitals.bloodPressure.systolic > 140 || latestVitals.bloodPressure.systolic < 90}
            />
            <VitalCard
              label="Heart Rate"
              value={String(latestVitals.heartRate)}
              unit="bpm"
              trend={getTrend(latestVitals.heartRate, previousVitals?.heartRate)}
              isAbnormal={latestVitals.heartRate > 100 || latestVitals.heartRate < 60}
            />
            <VitalCard
              label="Temperature"
              value={latestVitals.temperature.toFixed(1)}
              unit="°C"
              trend={getTrend(latestVitals.temperature, previousVitals?.temperature)}
              isAbnormal={latestVitals.temperature > 37.5 || latestVitals.temperature < 36.0}
            />
            <VitalCard
              label="Resp. Rate"
              value={String(latestVitals.respiratoryRate)}
              unit="/min"
              trend={getTrend(latestVitals.respiratoryRate, previousVitals?.respiratoryRate)}
              isAbnormal={latestVitals.respiratoryRate > 20 || latestVitals.respiratoryRate < 12}
            />
            <VitalCard
              label="SpO2"
              value={String(latestVitals.oxygenSaturation)}
              unit="%"
              trend={getTrend(latestVitals.oxygenSaturation, previousVitals?.oxygenSaturation)}
              isAbnormal={latestVitals.oxygenSaturation < 95}
            />
            {latestVitals.weight && (
              <VitalCard
                label="Weight"
                value={String(latestVitals.weight)}
                unit="kg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
