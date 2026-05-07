import { createMemo, For, Show } from 'solid-js';
import type { BrandScoreBreakdown } from '~/lib/types/brand';

interface BrandScoreIndicatorProps {
  score: number;
  breakdown?: BrandScoreBreakdown | null;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function BrandScoreIndicator(props: BrandScoreIndicatorProps) {
  const size = () => props.size ?? 'md';

  const dimensions = createMemo(() => {
    switch (size()) {
      case 'sm':
        return { width: 48, stroke: 4, fontSize: '0.65rem' };
      case 'lg':
        return { width: 96, stroke: 8, fontSize: '1rem' };
      default:
        return { width: 72, stroke: 6, fontSize: '0.8rem' };
    }
  });

  const radius = (dimensions().width - dimensions().stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (props.score / 100) * circumference;

  const scoreColor = createMemo(() => {
    if (props.score >= 80) return '#22C55E'; // green
    if (props.score >= 60) return '#EAB308'; // amber
    if (props.score >= 40) return '#F97316'; // orange
    return '#EF4444'; // red
  });

  const scoreLabel = createMemo(() => {
    if (props.score >= 80) return 'Excellent';
    if (props.score >= 60) return 'Good';
    if (props.score >= 40) return 'Needs work';
    return 'Poor';
  });

  return (
    <div class="inline-flex flex-col items-center gap-2">
      {/* Gauge */}
      <div class="relative" style={{ width: `${dimensions().width}px`, height: `${dimensions().width}px` }}>
        <svg
          width={dimensions().width}
          height={dimensions().width}
          class="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={dimensions().width / 2}
            cy={dimensions().width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            stroke-width={dimensions().stroke}
            class="text-gray-100 dark:text-gray-800"
          />
          {/* Score arc */}
          <circle
            cx={dimensions().width / 2}
            cy={dimensions().width / 2}
            r={radius}
            fill="none"
            stroke={scoreColor()}
            stroke-width={dimensions().stroke}
            stroke-dasharray={circumference}
            stroke-dashoffset={offset}
            stroke-linecap="round"
            class="transition-all duration-700 ease-out"
          />
        </svg>
        {/* Center text */}
        <div class="absolute inset-0 flex items-center justify-center">
          <span
            class="font-bold"
            style={{
              color: scoreColor(),
              'font-size': dimensions().fontSize,
            }}
          >
            {props.score}
          </span>
        </div>
      </div>

      {/* Label */}
      <Show when={props.showLabel !== false}>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
          {scoreLabel()}
        </span>
        <span class="text-[10px] text-gray-400 -mt-1">Consistency</span>
      </Show>

      {/* Breakdown bars */}
      <Show when={props.breakdown}>
        <div class="w-full space-y-1.5 mt-1">
          <For each={Object.entries(props.breakdown!).filter(([key]) => key !== 'overall')}>
            {([key, value]) => (
              <div class="flex items-center gap-2">
                <span class="w-24 text-xs text-gray-500 dark:text-gray-400 truncate">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                </span>
                <div class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${value}%`,
                      'background-color':
                        value >= 80
                          ? '#22C55E'
                          : value >= 60
                            ? '#EAB308'
                            : value >= 40
                              ? '#F97316'
                              : '#EF4444',
                    }}
                  />
                </div>
                <span class="w-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                  {value}
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
