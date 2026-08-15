'use client';

import { ReactNode, useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type TooltipInfoProps = {
  label: ReactNode;
  content: ReactNode;
  iconClassName?: string;
  tooltipClassName?: string;
  position?: 'right' | 'left' | 'top' | 'bottom';
};

export const TooltipInfo = ({
  label,
  content,
  iconClassName = 'text-foreground/70 size-5 rounded-full dark:text-foreground/80',
  tooltipClassName = 'bg-card min-w-[25rem] rounded-lg border-2 p-3 !text-xs max-w-xs',
  position = 'right',
}: TooltipInfoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Posicionamento dinâmico baseado na prop
  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'right-full top-1/2 mr-2 -translate-y-1/2';
      case 'top':
        return 'bottom-full left-1/2 mb-2 -translate-x-1/2';
      case 'bottom':
        return 'top-full left-1/2 mt-2 -translate-x-1/2';
      default: // right
        return 'left-full top-1/2 ml-2 -translate-y-1/2';
    }
  };

  return (
    <div className="group relative inline-flex items-center gap-2">
      {label}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Info className={iconClassName} />

        {/* Tooltip com portal opcional para escapar de containers com overflow */}
        {isHovered && (
          <div
            className={cn(
              'absolute z-[9999] transform',
              getPositionClasses(),
              tooltipClassName,
              'shadow-xl'
            )}
            style={{
              // Garante que não seja cortado por overflow-hidden
              position: 'absolute',
              // @ts-expect-error - propriedade experimental para escapar de clipping
              position: 'absolute',
            }}
          >
            {content}
          </div>
        )}
      </div>
    </div>
  );
};
