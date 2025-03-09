import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PopoverProps } from './popover.interfaces';
import styles from './popover.module.scss';
import { cn } from '@app-shared/lib/utils';

const Popover = ({
  children,
  content,
  placement = 'bottom',
  trigger = 'click',
  isOpen: controlledIsOpen,
  onOpenChange,
  showArrow = true,
  offset = 8,
  className,
  contentClassName,
  tailClassName,
  hasBackdrop = true,
}: PopoverProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const isHoveringRef = useRef<boolean>(false);

  const handleOpenChange = (newIsOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newIsOpen);
    } else {
      setInternalIsOpen(newIsOpen);
    }
  };

  const updatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'top':
        top = triggerRect.top - contentRect.height - offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.left - contentRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.right + offset;
        break;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left + contentRect.width > viewportWidth) {
      left = viewportWidth - contentRect.width - 8;
    }

    if (left < 8) {
      left = 8;
    }

    // Prevent overflow on the bottom
    if (top + contentRect.height > viewportHeight) {
      top = viewportHeight - contentRect.height - 8;
    }

    if (top < 8) {
      top = 8;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      isHoveringRef.current = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      handleOpenChange(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      isHoveringRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (!isHoveringRef.current) {
          handleOpenChange(false);
        }
      }, 150);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      handleOpenChange(!isOpen);
    }
  };

  const handleBackdropClick = () => {
    handleOpenChange(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        style={{ zIndex: isOpen ? 1001 : 'auto' }}
        className={cn(styles.trigger, className)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isOpen &&
        createPortal(
          <div className={styles.portalContainer} onClick={handleBackdropClick}>
            {hasBackdrop && trigger === 'click' && (
              <div className={styles.backdrop}></div>
            )}
            <div
              ref={contentRef}
              style={{
                top: coords.top,
                left: coords.left,
                zIndex: isOpen ? 1002 : 'auto',
              }}
              className={cn(
                styles.content,
                styles[placement],
                contentClassName,
              )}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => e.stopPropagation()}
            >
              {showArrow && (
                <div
                  className={cn(styles.tail, styles[placement], tailClassName)}
                />
              )}
              {content}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

Popover.displayName = 'Popover';

export default Popover;
