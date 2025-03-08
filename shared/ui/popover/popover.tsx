import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@app-shared/lib/utils';
import styles from './popover.module.scss';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  isOpen?: boolean;
  placement?: PopoverPlacement;
  offset?: number;
  showArrow?: boolean;
  trigger?: 'click' | 'hover';
  className?: string;
  contentClassName?: string;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export const Popover: FC<PopoverProps> = ({
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
  const [currentPlacement, setCurrentPlacement] =
    useState<PopoverPlacement>(placement);

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return null;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalPlacement = placement;

    // Use larger offset for left/right placements
    const horizontalOffset =
      placement === 'left' || placement === 'right' ? 16 : offset;

    const positions = {
      top: {
        top: triggerRect.top - contentRect.height - offset,
        left: triggerRect.left + (triggerRect.width - contentRect.width) / 2,
        arrowTop: contentRect.height,
        arrowLeft: contentRect.width / 2 - 4,
      },
      bottom: {
        top: triggerRect.bottom + offset,
        left: triggerRect.left + (triggerRect.width - contentRect.width) / 2,
        arrowTop: -8,
        arrowLeft: contentRect.width / 2 - 4,
      },
      left: {
        top: triggerRect.top + (triggerRect.height - contentRect.height) / 2,
        left: triggerRect.left - contentRect.width - horizontalOffset,
        arrowTop: contentRect.height / 2 - 4,
        arrowLeft: contentRect.width,
      },
      right: {
        top: triggerRect.top + (triggerRect.height - contentRect.height) / 2,
        left: triggerRect.right + horizontalOffset,
        arrowTop: contentRect.height / 2 - 4,
        arrowLeft: -8,
      },
    };

    // Ensure we have a valid placement
    if (!positions[placement]) {
      finalPlacement = 'bottom';
    }

    let pos = positions[finalPlacement];

    // Check if popover would go outside viewport and flip if necessary
    if (finalPlacement === 'top' && pos.top < 8) {
      finalPlacement = 'bottom';
      pos = positions[finalPlacement];
    } else if (
      finalPlacement === 'bottom' &&
      pos.top + contentRect.height > viewportHeight - 8
    ) {
      finalPlacement = 'top';
      pos = positions[finalPlacement];
    } else if (finalPlacement === 'left' && pos.left < 8) {
      finalPlacement = 'right';
      pos = positions[finalPlacement];
    } else if (
      finalPlacement === 'right' &&
      pos.left + contentRect.width > viewportWidth - 8
    ) {
      finalPlacement = 'left';
      pos = positions[finalPlacement];
    }

    // Adjust for viewport boundaries
    if (pos.left < 8) {
      pos.left = 8;
      pos.arrowLeft = Math.max(
        triggerRect.left + triggerRect.width / 2 - pos.left - 4,
        8,
      );
    } else if (pos.left + contentRect.width > viewportWidth - 8) {
      pos.left = viewportWidth - contentRect.width - 8;
      pos.arrowLeft = Math.min(
        triggerRect.left - pos.left + triggerRect.width / 2 - 4,
        contentRect.width - 8,
      );
    }

    if (pos.top < 8) {
      pos.top = 8;
      pos.arrowTop = Math.max(
        triggerRect.top + triggerRect.height / 2 - pos.top - 4,
        8,
      );
    } else if (pos.top + contentRect.height > viewportHeight - 8) {
      pos.top = viewportHeight - contentRect.height - 8;
      pos.arrowTop = Math.min(
        triggerRect.top - pos.top + triggerRect.height / 2 - 4,
        contentRect.height - 8,
      );
    }

    return {
      position: {
        top: pos.top + window.scrollY,
        left: pos.left + window.scrollX,
      },
      arrowPosition: { top: pos.arrowTop, left: pos.arrowLeft },
      finalPlacement,
    };
  }, [offset, placement]);

  const updatePosition = useCallback(() => {
    const newPositions = calculatePosition();
    if (newPositions) {
      setPosition(newPositions.position);
      setArrowPosition(newPositions.arrowPosition);
      setCurrentPlacement(newPositions.finalPlacement);
    }
  }, [calculatePosition]);

  const handleOpen = useCallback(() => {
    if (!controlledIsOpen) {
      setUncontrolledIsOpen(true);
    }
    onOpenChange?.(true);
    // Delay position calculation to next frame to ensure content is rendered
    requestAnimationFrame(updatePosition);
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
      const handleScroll = () => {
        if (triggerRef.current) {
          const newPositions = calculatePosition();
          if (newPositions) {
            setPosition(newPositions.position);
            setArrowPosition(newPositions.arrowPosition);
          } else {
            handleClose();
          }
        }
      };

      window.addEventListener('scroll', handleScroll, true);
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
          window.removeEventListener('scroll', handleScroll, true);
          window.removeEventListener('resize', updatePosition);
        };
      }

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [
    isOpen,
    closeOnClickOutside,
    handleClose,
    updatePosition,
    calculatePosition,
  ]);

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

  const renderContent = () => {
    if (typeof content === 'string') {
      return <div className={styles.simpleContent}>{content}</div>;
    }
    return content;
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={cn(styles.trigger, className)}
        {...triggerProps}
      >
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
            {renderContent()}
            {showArrow && (
              <div
                className={cn(
                  styles.arrow,
                  styles[currentPlacement.split('-')[0]],
                )}
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
