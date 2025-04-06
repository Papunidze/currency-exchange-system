'use client';

import React, { FC, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@app-shared/lib/utils';
import styles from './popover.module.scss';
import { PopoverProps } from './popover.interfaces';

const Popover = ({
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
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body;
    const style = document.createElement('style');
    style.textContent = `
      body.popover-open {
        transition: transform 0.15s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const lockScroll = () => {
    if (!bodyRef.current) return;
    scrollY.current = window.scrollY;
    bodyRef.current.classList.add('popover-open');
    bodyRef.current.style.position = 'fixed';
    bodyRef.current.style.top = `-${scrollY.current}px`;
    bodyRef.current.style.width = '100%';
    bodyRef.current.style.height = '100%';
    bodyRef.current.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    if (!bodyRef.current) return;
    bodyRef.current.classList.remove('popover-open');
    bodyRef.current.style.position = '';
    bodyRef.current.style.top = '';
    bodyRef.current.style.width = '';
    bodyRef.current.style.height = '';
    bodyRef.current.style.overflow = '';
    window.scrollTo(0, scrollY.current);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

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

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left + popoverRect.width > viewportWidth + scrollX - 10) {
      left = viewportWidth + scrollX - popoverRect.width - 10;
    }

    if (left < scrollX + 10) {
      left = scrollX + 10;
    }

    if (top + popoverRect.height > viewportHeight + scrollY - 10) {
      top = viewportHeight + scrollY - popoverRect.height - 10;
    }

    if (top < scrollY + 10) {
      top = scrollY + 10;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      setIsVisible(true);
      lockScroll();
      onOpen?.();

      const handleResize = () => {
        updatePosition();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        unlockScroll();
      };
    } else {
      setIsVisible(false);
      unlockScroll();
    }
  }, [isOpen, placement]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (!popoverRef.current || !triggerRef.current) return;
    if (
      !popoverRef.current.contains(e.target as Node) &&
      !triggerRef.current.contains(e.target as Node) &&
      closeOnOutsideClick
    ) {
      onClose?.();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen) {
      onClose?.();
    }
  };

  return (
    <div className={cn(styles.popoverContainer)} {...props}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {triggerElement}
      </div>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className={cn(
              styles.popover,
              styles[size],
              styles[variant],
              styles[placement],
              className,
            )}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            role="dialog"
            aria-modal="false"
            aria-labelledby={title ? 'popover-title' : undefined}
            data-visible={isVisible}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && closeOnEscape) {
                e.preventDefault();
                onClose?.();
              }
            }}
          >
            <div className={cn(styles.content, contentClassName)}>
              {title && (
                <h2 id="popover-title" className={styles.title}>
                  {title}
                </h2>
              )}

              {children}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

Popover.displayName = 'Popover';

export default Popover;
