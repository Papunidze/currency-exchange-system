import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PopoverProps } from './popover.inerfaces';
import styles from './popover.module.scss';
import { cn } from '../../lib/utils';

const Popover: React.FC<PopoverProps> = ({
  children,
  triggerElement,
  title,
  className = '',
  contentClassName = '',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  size = 'md',
  variant = 'primary',
  placement = 'bottom',
  trigger = 'click',
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
  offset = 8,
  autoFocus = false,
  trapFocus = false,
  transparent = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState(placement);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  const isControlled = controlledIsOpen !== undefined;

  const handleOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpen?.();
  };

  const handleClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClose?.();
  };

  const toggleOpen = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleClickTrigger = () => {
    if (trigger === 'click') {
      toggleOpen();
    }
  };

  const handleMouseEnterTrigger = () => {
    if (trigger === 'hover') {
      handleOpen();
    }
  };

  const handleMouseLeaveTrigger = () => {
    if (trigger === 'hover') {
      handleClose();
    }
  };

  const handleFocusTrigger = () => {
    if (trigger === 'focus') {
      handleOpen();
    }
  };

  const handleBlurTrigger = () => {
    if (trigger === 'focus') {
      handleClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      handleClose();
    }

    if (trapFocus && isOpen && e.key === 'Tab') {
      if (!document.activeElement) return;

      const firstFocusable = firstFocusableElementRef.current;
      const lastFocusable = lastFocusableElementRef.current;

      if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!closeOnOutsideClick) return;

    const target = e.target as Node;
    if (
      contentRef.current &&
      !contentRef.current.contains(target) &&
      triggerRef.current &&
      !triggerRef.current.contains(target)
    ) {
      handleClose();
    }
  };

  const handleScroll = () => {
    if (isOpen) {
      updatePosition();
    }
  };

  const updatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    const spaceTop = triggerRect.top;
    const spaceRight =
      window.innerWidth - (triggerRect.left + triggerRect.width);
    const spaceBottom =
      window.innerHeight - (triggerRect.top + triggerRect.height);
    const spaceLeft = triggerRect.left;

    let newPlacement = placement;
    let top = 0;
    let left = 0;

    // Determine best placement
    if (placement === 'top' && spaceTop < contentRect.height + offset) {
      newPlacement = 'bottom';
    } else if (
      placement === 'right' &&
      spaceRight < contentRect.width + offset
    ) {
      newPlacement = 'left';
    } else if (
      placement === 'bottom' &&
      spaceBottom < contentRect.height + offset
    ) {
      newPlacement = 'top';
    } else if (placement === 'left' && spaceLeft < contentRect.width + offset) {
      newPlacement = 'right';
    }

    // Calculate position based on placement
    switch (newPlacement) {
      case 'top':
        top = triggerRect.top - contentRect.height - offset;
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
        left = triggerRect.left + triggerRect.width + offset;
        break;
      case 'bottom':
        top = triggerRect.top + triggerRect.height + offset;
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
        left = triggerRect.left - contentRect.width - offset;
        break;
    }

    // Ensure popover stays within viewport
    if (left < 0) {
      left = 10;
    } else if (left + contentRect.width > window.innerWidth) {
      left = window.innerWidth - contentRect.width - 10;
    }

    if (top < 0) {
      top = 10;
    } else if (top + contentRect.height > window.innerHeight) {
      top = window.innerHeight - contentRect.height - 10;
    }

    setPosition({ top, left });
    setActualPlacement(newPlacement);
  };

  const setFocusableElements = () => {
    if (!contentRef.current || !trapFocus) return;

    const focusableElements = contentRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length) {
      firstFocusableElementRef.current = focusableElements[0] as HTMLElement;
      lastFocusableElementRef.current = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (autoFocus) {
        firstFocusableElementRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (isControlled) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen, isControlled]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', handleScroll, true);

      updatePosition();
      setFocusableElements();

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen]);

  const triggerClasses = cn(styles.trigger);

  const popoverClasses = cn(
    styles.popover,
    styles[`popover-${size}`],
    styles[`popover-${variant}`],
    styles[`placement-${actualPlacement}`],
    transparent && styles.transparent,
    className,
  );

  const titleClasses = cn(styles.title);
  const bodyClasses = cn(styles.body);

  const popoverStyle = {
    '--popover-top': `${position.top}px`,
    '--popover-left': `${position.left}px`,
  } as React.CSSProperties;

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleClickTrigger}
        onMouseEnter={handleMouseEnterTrigger}
        onMouseLeave={handleMouseLeaveTrigger}
        onFocus={handleFocusTrigger}
        onBlur={handleBlurTrigger}
        className={triggerClasses}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {triggerElement}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={contentRef}
            className={popoverClasses}
            style={popoverStyle}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            {...rest}
          >
            {title && <div className={titleClasses}>{title}</div>}
            <div className={bodyClasses}>{children}</div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Popover;
