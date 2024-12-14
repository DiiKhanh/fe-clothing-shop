import { ReactNode } from 'react';

type PopperWrapperProps = {
  children: ReactNode;
  className?: string;
};

function PopperWrapper({ children, className = '' }: PopperWrapperProps) {
  return (
    <div
      className={`w-full min-w-max border-t-2 border-solid border-[#ee4266]
        shadow-[0_0px_4px_0px_rgb(0 0 0 / 5%)] bg-[#222] ${className}`}
    >
      {children}
    </div>
  );
}

export default PopperWrapper;
