'use client';

import { useState } from 'react';

import styles from './page.module.scss';
import Button from '@app-shared/ui/button';
import { Dialog } from '@app-shared/ui/dialog';

const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
const positions = ['center', 'top'] as const;

export default function DialogDemo() {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});

  const handleOpen = (dialogId: string) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogId]: true }));
  };

  const handleClose = (dialogId: string) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogId]: false }));
  };

  return (
    <div className={styles.container}>
      <h1>Dialog Component</h1>

      {/* Basic Examples */}
      <section>
        <h2>Basic Examples</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Simple Dialog</h3>
            <Button onClick={() => handleOpen('simple')}>Open Dialog</Button>
            <Dialog
              isOpen={openDialogs['simple']}
              onClose={() => handleClose('simple')}
              title="Simple Dialog"
              description="This is a basic dialog with title and description."
            >
              <p>This is the dialog content.</p>
            </Dialog>
          </div>

          <div className={styles.item}>
            <h3>Without Close Button</h3>
            <Button onClick={() => handleOpen('noClose')}>Open Dialog</Button>
            <Dialog
              isOpen={openDialogs['noClose']}
              onClose={() => handleClose('noClose')}
              showClose={false}
              title="No Close Button"
            >
              <p>This dialog has no close button in the corner.</p>
              <div className={styles.actions}>
                <Button onClick={() => handleClose('noClose')}>Close</Button>
              </div>
            </Dialog>
          </div>

          <div className={styles.item}>
            <h3>Persistent Dialog</h3>
            <Button onClick={() => handleOpen('persistent')}>
              Open Dialog
            </Button>
            <Dialog
              isOpen={openDialogs['persistent']}
              onClose={() => handleClose('persistent')}
              closeOnBackdrop={false}
              closeOnEscape={false}
              title="Persistent Dialog"
              description="This dialog can only be closed using the close button or action buttons."
            >
              <div className={styles.actions}>
                <Button onClick={() => handleClose('persistent')}>Close</Button>
              </div>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h2>Size Variants</h2>
        <div className={styles.grid}>
          {sizes.map((size) => (
            <div key={size} className={styles.item}>
              <h3>{size.toUpperCase()} Size</h3>
              <Button onClick={() => handleOpen(`size-${size}`)}>
                Open {size.toUpperCase()} Dialog
              </Button>
              <Dialog
                isOpen={openDialogs[`size-${size}`]}
                onClose={() => handleClose(`size-${size}`)}
                size={size}
                title={`${size.toUpperCase()} Dialog`}
                description={`This is a dialog with ${size} size variant.`}
              >
                <p>Dialog content goes here.</p>
              </Dialog>
            </div>
          ))}
        </div>
      </section>

      {/* Position Variants */}
      <section>
        <h2>Position Variants</h2>
        <div className={styles.grid}>
          {positions.map((position) => (
            <div key={position} className={styles.item}>
              <h3>{position} Position</h3>
              <Button onClick={() => handleOpen(`position-${position}`)}>
                Open {position} Dialog
              </Button>
              <Dialog
                isOpen={openDialogs[`position-${position}`]}
                onClose={() => handleClose(`position-${position}`)}
                position={position}
                title={`${position} Position`}
                description={`This dialog is positioned at the ${position}.`}
              >
                <p>Dialog content goes here.</p>
              </Dialog>
            </div>
          ))}
        </div>
      </section>

      {/* Complex Example */}
      <section>
        <h2>Complex Example</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Form Dialog</h3>
            <Button onClick={() => handleOpen('form')}>Open Form Dialog</Button>
            <Dialog
              isOpen={openDialogs['form']}
              onClose={() => handleClose('form')}
              title="Contact Form"
              description="Please fill out the form below."
              size="lg"
            >
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Enter your name" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>
                <div className={styles.actions}>
                  <Button variant="ghost" onClick={() => handleClose('form')}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Dialog>
          </div>

          <div className={styles.item}>
            <h3>Scrollable Content</h3>
            <Button onClick={() => handleOpen('scroll')}>
              Open Scrollable Dialog
            </Button>
            <Dialog
              isOpen={openDialogs['scroll']}
              onClose={() => handleClose('scroll')}
              title="Scrollable Content"
              size="md"
            >
              <div className={styles.longContent}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <p key={i}>
                    This is paragraph {i + 1} with some sample text to
                    demonstrate scrolling behavior in the dialog.
                  </p>
                ))}
              </div>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
}
