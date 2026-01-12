import { cn, stopPropagation } from '@/shared';
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
  useEffectEvent,
  isValidElement,
  cloneElement,
} from 'react';

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export const Dropdown = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleClickOutside = useEffectEvent(
    (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={dropdownRef} className={cn('relative', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

type Props = {
  children: React.ReactElement;
  className?: string;
  asChild?: boolean;
};

const Trigger = ({ children, className = '', asChild }: Props) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Trigger must be used within Dropdown');

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<
      React.HTMLAttributes<HTMLElement>
    >;

    const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
      stopPropagation(e);
      child.props.onClick?.(e);
      context.toggle();
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
      stopPropagation(e);
      child.props.onMouseDown?.(e);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
      stopPropagation(e);
      child.props.onTouchStart?.(e);
    };

    return cloneElement(child, {
      ...child.props,
      onClick: handleToggle,
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      className: cn(child.props.className, className),
    });
  }

  return (
    <div
      onClick={(e) => {
        stopPropagation(e);
        context.toggle();
      }}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
      className={className}>
      {children}
    </div>
  );
};

const Menu = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(DropdownContext);
  if (!context || !context.isOpen) return null;

  return (
    <div
      className={`absolute right-0 top-full mt-2 w-36 bg-[#2c2f38] border border-white/10 rounded-xl shadow-xl overflow-hidden z-30 animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}>
      {children}
    </div>
  );
};

type ItemProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

const Item = ({ children, onClick, className = '' }: ItemProps) => {
  const context = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
    context?.close();
  };

  const baseStyle =
    'w-full flex items-center gap-2 px-4 py-3 text-sm transition text-left cursor-pointer';

  return (
    <button onClick={handleClick} className={`${baseStyle} ${className}`}>
      {children}
    </button>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;
