import { ReactNode } from 'react';
import { Popover, PopoverProps } from 'antd';
import './PopOver.css';

interface PopOverProps extends Omit<PopoverProps, 'content'> {
  trigger?: 'click' | 'hover' | 'focus' | 'contextMenu';
  content: ReactNode;
  onChange?: (visible: boolean) => void;
  children: ReactNode;
}

function PopOver({
  trigger = 'click',
  content,
  onChange,
  children,
  ...props
}: PopOverProps) {
  return (
    <Popover
      onOpenChange={onChange}
      arrow={false}
      content={content}
      trigger={trigger}
      {...props}
    >
      {children}
    </Popover>
  );
}

export default PopOver;
