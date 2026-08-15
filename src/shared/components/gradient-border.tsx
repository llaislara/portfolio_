import { ReactNode } from 'react';

type GradientBorderProps = {
  children: ReactNode;
  className?: string;
  fromColor?: string;
  toColor?: string;
  direction?: 'to-t' | 'to-r' | 'to-b' | 'to-l' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  rounded?: string;
  hoverEffect?: boolean;
};

export const GradientBorder = ({ children }: GradientBorderProps) => {
  return (
    <div className="dark:from-secondary dark:to-primary dark:relative dark:rounded-xl dark:bg-gradient-to-tr dark:p-[.05rem] dark:shadow-lg">
      {children}
    </div>
  );
};
