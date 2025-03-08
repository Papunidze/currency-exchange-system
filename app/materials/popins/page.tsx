'use client';

import { useState } from 'react';
import { Popins } from '@app-shared/ui/popins';
import Button from '@app-shared/ui/button';
import styles from './page.module.scss';

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const;

export default function PopinsDemo() {
  const [openPopins, setOpenPopins] = useState<Record<string, boolean>>({});

  const handleOpenChange = (id: string, isOpen: boolean) => {
    setOpenPopins((prev) => ({ ...prev, [id]: isOpen }));
  };

  return (
    <div className={styles.container}>
      <h1>Popins Component</h1>

      {/* Basic Examples */}
      <section>
        <h2>Basic Examples</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Simple Tooltip</h3>
            <Popins
              content="This is a simple tooltip"
              trigger="hover"
              placement="top"
            >
              <Button>Hover me</Button>
            </Popins>
          </div>

          <div className={styles.item}>
            <h3>Click Trigger</h3>
            <Popins
              content="This popover opens on click"
              trigger="click"
              placement="bottom"
            >
              <Button>Click me</Button>
            </Popins>
          </div>

          <div className={styles.item}>
            <h3>Custom Content</h3>
            <Popins
              content={
                <div className={styles.customContent}>
                  <h4>Custom Content</h4>
                  <p>
                    This popover has custom styled content with multiple
                    elements.
                  </p>
                  <Button size="small">Action</Button>
                </div>
              }
              placement="right"
            >
              <Button>Show Custom Content</Button>
            </Popins>
          </div>
        </div>
      </section>

      {/* Placement Examples */}
      <section>
        <h2>Placement Variants</h2>
        <div className={styles.placementGrid}>
          {placements.map((placement) => (
            <div key={placement} className={styles.item}>
              <h3>{placement}</h3>
              <Popins
                content={`This is a ${placement} placed popover`}
                placement={placement}
                isOpen={openPopins[placement]}
                onOpenChange={(isOpen) => handleOpenChange(placement, isOpen)}
              >
                <Button variant="secondary" size="small">
                  {placement}
                </Button>
              </Popins>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2>Features</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Without Arrow</h3>
            <Popins
              content="This popover has no arrow"
              showArrow={false}
              placement="top"
            >
              <Button>No Arrow</Button>
            </Popins>
          </div>

          <div className={styles.item}>
            <h3>Custom Offset</h3>
            <Popins
              content="This popover has a larger offset"
              offset={16}
              placement="bottom"
            >
              <Button>Large Offset</Button>
            </Popins>
          </div>

          <div className={styles.item}>
            <h3>Controlled State</h3>
            <Popins
              content="This is a controlled popover"
              isOpen={openPopins['controlled']}
              onOpenChange={(isOpen) => handleOpenChange('controlled', isOpen)}
              placement="right"
            >
              <Button
                variant={openPopins['controlled'] ? 'primary' : 'secondary'}
              >
                {openPopins['controlled'] ? 'Close' : 'Open'} Popover
              </Button>
            </Popins>
          </div>
        </div>
      </section>

      {/* Complex Examples */}
      <section>
        <h2>Complex Examples</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Form Popover</h3>
            <Popins
              content={
                <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />
                  </div>
                  <div className={styles.formActions}>
                    <Button variant="ghost" size="small">
                      Cancel
                    </Button>
                    <Button size="small">Submit</Button>
                  </div>
                </form>
              }
              placement="bottom-start"
            >
              <Button>Show Form</Button>
            </Popins>
          </div>

          <div className={styles.item}>
            <h3>Menu Popover</h3>
            <Popins
              content={
                <div className={styles.menu}>
                  <button className={styles.menuItem}>
                    <span>Profile</span>
                  </button>
                  <button className={styles.menuItem}>
                    <span>Settings</span>
                  </button>
                  <button className={styles.menuItem}>
                    <span>Help</span>
                  </button>
                  <div className={styles.menuDivider} />
                  <button className={styles.menuItem}>
                    <span>Logout</span>
                  </button>
                </div>
              }
              placement="bottom-end"
            >
              <Button>Show Menu</Button>
            </Popins>
          </div>

          <div className={styles.item}>
            <h3>Interactive Content</h3>
            <Popins
              content={
                <div className={styles.interactive}>
                  <div className={styles.tabs}>
                    <button className={styles.tabActive}>Tab 1</button>
                    <button>Tab 2</button>
                    <button>Tab 3</button>
                  </div>
                  <div className={styles.tabContent}>
                    <p>
                      This is the content of Tab 1. You can interact with
                      elements inside the popover.
                    </p>
                  </div>
                </div>
              }
              placement="bottom"
            >
              <Button>Interactive Demo</Button>
            </Popins>
          </div>
        </div>
      </section>
    </div>
  );
}
