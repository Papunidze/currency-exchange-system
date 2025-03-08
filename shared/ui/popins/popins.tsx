import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@app-shared/lib/utils';
import styles from './popins.module.scss';
import { PopinsProps } from './popins.interfaces';

export const Popins: FC<PopinsProps> = ({
  children,
  content,
  isOpen: controlledIsOpen,
  placement = 'bottom',
  offset = 8,
  showArrow = true,
  trigger = 'click',
  className = '',
  contentClassName = '',
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;

    // Calculate position based on placement
    switch (placement) {
      case 'top':
        top = triggerRect.top - contentRect.height - offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        arrowTop = contentRect.height;
        arrowLeft = contentRect.width / 2 - 8;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        arrowTop = -8;
        arrowLeft = contentRect.width / 2 - 8;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.left - contentRect.width - offset;
        arrowTop = contentRect.height / 2 - 8;
        arrowLeft = contentRect.width;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.right + offset;
        arrowTop = contentRect.height / 2 - 8;
        arrowLeft = -8;
        break;
      // Add more cases for other placements
    }

    // Prevent content from going outside viewport
    if (left < 0) left = 0;
    if (left + contentRect.width > viewportWidth) {
      left = viewportWidth - contentRect.width;
    }
    if (top < 0) top = 0;
    if (top + contentRect.height > viewportHeight) {
      top = viewportHeight - contentRect.height;
    }

    setPosition({ top: top + window.scrollY, left: left + window.scrollX });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  }, [offset, placement]);

  const handleOpen = useCallback(() => {
    if (!controlledIsOpen) {
      setUncontrolledIsOpen(true);
    }
    onOpenChange?.(true);
    updatePosition();
  }, [controlledIsOpen, onOpenChange, updatePosition]);

  const handleClose = useCallback(() => {
    if (!controlledIsOpen) {
      setUncontrolledIsOpen(false);
    }
    onOpenChange?.(false);
  }, [controlledIsOpen, onOpenChange]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      if (closeOnClickOutside) {
        const handleClickOutside = (e: MouseEvent) => {
          if (
            !triggerRef.current?.contains(e.target as Node) &&
            !contentRef.current?.contains(e.target as Node)
          ) {
            handleClose();
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, closeOnClickOutside, handleClose, updatePosition]);

  useEffect(() => {
    if (closeOnEscape) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, closeOnEscape, handleClose]);

  const triggerProps =
    trigger === 'hover'
      ? {
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        }
      : {
          onClick: isOpen ? handleClose : handleOpen,
        };

  return (
    <>
      <div ref={triggerRef} className={styles.trigger} {...triggerProps}>
        {children}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={contentRef}
            className={cn(styles.content, contentClassName)}
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {content}
            {showArrow && (
              <div
                className={cn(styles.arrow, styles[placement])}
                style={{
                  top: arrowPosition.top,
                  left: arrowPosition.left,
                }}
              />
            )}
          </div>,
          document.body,
        )}
    </>
  );
};
