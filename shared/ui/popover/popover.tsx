'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@app-shared/lib/utils';
import styles from './popover.module.scss';
import { PopoverProps } from './popover.interfaces';

const Popover = React.memo(
  ({
    isOpen,
    children,
    triggerElement,
    title,
    className,
    contentClassName,
    showClose = true,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    size = 'md',
    variant = 'primary',
    placement = 'bottom',
    onClose,
    onOpen,
    offset = 8,
    ...props
  }: PopoverProps) => {
    const uniqueId = useId();
    const [mounted, setMounted] = useState(false);
    const [state, setState] = useState({
      position: { top: 0, left: 0 },
      animationState: 'exited' as 'entering' | 'entered' | 'exiting' | 'exited',
    });

    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const prevOpen = useRef<boolean>(isOpen);
    const rafId = useRef<number | null>(null);
    const scrollLockActive = useRef<boolean>(false);

    const animationClass = useMemo(() => {
      switch (state.animationState) {
        case 'entering':
          return styles.entering;
        case 'entered':
          return styles.entered;
        case 'exiting':
          return styles.exiting;
        case 'exited':
          return styles.exited;
        default:
          return '';
      }
    }, [state.animationState]);

    const isVisible = state.animationState === 'entered';
    const shouldRenderPopover =
      mounted && (isOpen || state.animationState === 'exiting');

    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current)
        return { top: 0, left: 0 };

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 10;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top + scrollY - popoverRect.height - offset;
          left =
            triggerRect.left +
            scrollX +
            triggerRect.width / 2 -
            popoverRect.width / 2;
          break;
        case 'right':
          top =
            triggerRect.top +
            scrollY +
            triggerRect.height / 2 -
            popoverRect.height / 2;
          left = triggerRect.right + scrollX + offset;
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + offset;
          left =
            triggerRect.left +
            scrollX +
            triggerRect.width / 2 -
            popoverRect.width / 2;
          break;
        case 'left':
          top =
            triggerRect.top +
            scrollY +
            triggerRect.height / 2 -
            popoverRect.height / 2;
          left = triggerRect.left + scrollX - popoverRect.width - offset;
          break;
        default:
          top = triggerRect.bottom + scrollY + offset;
          left =
            triggerRect.left +
            scrollX +
            triggerRect.width / 2 -
            popoverRect.width / 2;
      }

      left = Math.max(
        padding + scrollX,
        Math.min(left, viewportWidth + scrollX - popoverRect.width - padding),
      );
      top = Math.max(
        padding + scrollY,
        Math.min(top, viewportHeight + scrollY - popoverRect.height - padding),
      );

      return { top, left };
    }, [offset, placement]);

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const position = calculatePosition();
        setState((prev) => ({
          ...prev,
          position,
        }));
      });
    }, [calculatePosition]);

    const setupScrollLock = useCallback(() => {
      if (scrollLockActive.current) return;

      if (window.innerWidth > 768) {
        const scrollY = window.scrollY;
        const scrollBarWidth =
          window.innerWidth - document.documentElement.clientWidth;

        document.body.style.setProperty('--scroll-y', `${scrollY}px`);
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        document.body.style.overflow = 'hidden';

        scrollLockActive.current = true;
      }
    }, []);

    const cleanupScrollLock = useCallback(() => {
      if (!scrollLockActive.current) return;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';

      const scrollY = parseInt(
        document.body.style.getPropertyValue('--scroll-y') || '0',
      );
      window.scrollTo(0, scrollY);

      scrollLockActive.current = false;
    }, []);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setMounted(true);
      }

      return () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        cleanupScrollLock();
      };
    }, [cleanupScrollLock]);

    useEffect(() => {
      if (prevOpen.current !== isOpen) {
        prevOpen.current = isOpen;

        if (isOpen) {
          setState((prev) => ({ ...prev, animationState: 'entering' }));
          setupScrollLock();

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setState((prev) => ({ ...prev, animationState: 'entered' }));
              onOpen?.();
            });
          });
        } else {
          setState((prev) => ({ ...prev, animationState: 'exiting' }));

          const exitTimer = setTimeout(() => {
            setState((prev) => ({ ...prev, animationState: 'exited' }));
            cleanupScrollLock();
          }, 200);

          return () => clearTimeout(exitTimer);
        }
      }
    }, [isOpen, onOpen, setupScrollLock, cleanupScrollLock]);

    useEffect(() => {
      if (!isOpen || !mounted) return;

      updatePosition();

      const handleUpdate = () => {
        if (isOpen) {
          updatePosition();
        }
      };

      window.addEventListener('resize', handleUpdate);
      window.addEventListener('scroll', handleUpdate, true);

      return () => {
        window.removeEventListener('resize', handleUpdate);
        window.removeEventListener('scroll', handleUpdate, true);
      };
    }, [isOpen, mounted, updatePosition]);

    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: MouseEvent) => {
        if (
          closeOnOutsideClick &&
          popoverRef.current &&
          triggerRef.current &&
          !popoverRef.current.contains(e.target as Node) &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          onClose?.();
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') {
          e.preventDefault();
          onClose?.();
        }
      };

      document.addEventListener('mousedown', handleOutsideClick, true);
      document.addEventListener('keydown', handleKeyDown, true);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick, true);
        document.removeEventListener('keydown', handleKeyDown, true);
      };
    }, [isOpen, closeOnOutsideClick, closeOnEscape, onClose]);

    const titleId = `popover-title-${uniqueId}`;
    const contentId = `popover-content-${uniqueId}`;

    return (
      <div className={cn(styles.popoverContainer)} {...props}>
        <div
          ref={triggerRef}
          className={styles.trigger}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpen) {
              onOpen?.();
            } else {
              onClose?.();
            }
          }}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-controls={isOpen ? contentId : undefined}
        >
          {triggerElement}
        </div>

        {shouldRenderPopover &&
          createPortal(
            <div
              className={styles.popoverWrapper}
              aria-hidden={!isVisible}
              data-testid="popover-wrapper"
            >
              <div
                ref={popoverRef}
                className={cn(
                  styles.popover,
                  styles[size],
                  styles[variant],
                  styles[placement],
                  animationClass,
                  className,
                )}
                style={{
                  top: `${state.position.top}px`,
                  left: `${state.position.left}px`,
                }}
                role="dialog"
                aria-modal="false"
                aria-labelledby={title ? titleId : undefined}
                id={contentId}
                data-visible={isVisible}
                data-testid="popover-content"
              >
                <div className={cn(styles.content, contentClassName)}>
                  {title && (
                    <div className={styles.header}>
                      <h2 id={titleId} className={styles.title}>
                        {title}
                      </h2>
                      {showClose && (
                        <button
                          type="button"
                          className={styles.closeButton}
                          onClick={() => onClose?.()}
                          aria-label="Close popover"
                        >
                          <span className={styles.closeIcon} aria-hidden="true">
                            ×
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                  <div className={styles.body}>{children}</div>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    );
  },
);

Popover.displayName = 'Popover';

export default Popover;
