import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: string[],
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = ['medium'], onClick, className }) => {
  const baseClasses = 'text-lg cursor-pointer';
  
  const variantClassesMap: { [key: string]: string } = {
    transparent: 'bg-semiTransparentWhite text-white border-white hover:bg-semiTransparentWhiteHover',
    opaque: 'bg-current text-white border-currentContrast hover:opacity-80',
    dayChip: 'px-0.5 py-0.25 mr-0 border-currentContrast inline-block w-[67px] leading-[30px] text-center capitalize',
    buttonGroup: 'rounded-none border-0 !m-0',
    icon: 'px-0.5 mr-0.5 rounded border',
    medium: 'py-0.5 px-1 rounded border',
    wed: 'bg-wed',
    thu: 'bg-thu',
    fri: 'bg-fri',
    sat: 'bg-sat',
    sun: 'bg-sun',
    mon: 'bg-mon',
  };

  const variantClasses = variant.map(v => variantClassesMap[v] || variantClassesMap.default).join(' ');

  return (
    <button className={`${baseClasses} ${variantClasses} ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;