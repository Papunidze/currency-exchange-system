'use client';

import { useState } from 'react';
import { Backdrop } from '@app-shared/ui/backdrop';
import Button from '@app-shared/ui/button';
import styles from './page.module.scss';

const opacityLevels = [25, 50, 75, 90] as const;

export default function BackdropDemo() {
  const [openBackdrops, setOpenBackdrops] = useState<Record<string, boolean>>(
    {},
  );

  const handleOpen = (backdropId: string) => {
    setOpenBackdrops((prev) => ({ ...prev, [backdropId]: true }));
  };

  const handleClose = (backdropId: string) => {
    setOpenBackdrops((prev) => ({ ...prev, [backdropId]: false }));
  };

  return (
    <div className={styles.container}>
      <h1>Backdrop Component</h1>

      {/* Basic Examples */}
      <section>
        <h2>Basic Examples</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Simple Backdrop</h3>
            <Button onClick={() => handleOpen('simple')}>Show Backdrop</Button>
            <Backdrop
              isOpen={openBackdrops['simple']}
              onClick={() => handleClose('simple')}
              opacity={50}
            />
          </div>

          <div className={styles.item}>
            <h3>With Blur Effect</h3>
            <Button onClick={() => handleOpen('blur')}>
              Show Blurred Backdrop
            </Button>
            <Backdrop
              isOpen={openBackdrops['blur']}
              onClick={() => handleClose('blur')}
              opacity={50}
              blur
            />
          </div>

          <div className={styles.item}>
            <h3>Non-Clickable</h3>
            <Button onClick={() => handleOpen('nonClickable')}>
              Show Non-Clickable
            </Button>
            <Backdrop isOpen={openBackdrops['nonClickable']} opacity={50}>
              <div className={styles.content}>
                <p>Click the button to close</p>
                <Button onClick={() => handleClose('nonClickable')}>
                  Close
                </Button>
              </div>
            </Backdrop>
          </div>
        </div>
      </section>

      {/* Opacity Variants */}
      <section>
        <h2>Opacity Variants</h2>
        <div className={styles.grid}>
          {opacityLevels.map((opacity) => (
            <div key={opacity} className={styles.item}>
              <h3>{opacity}% Opacity</h3>
              <Button onClick={() => handleOpen(`opacity-${opacity}`)}>
                Show {opacity}% Opacity
              </Button>
              <Backdrop
                isOpen={openBackdrops[`opacity-${opacity}`]}
                onClick={() => handleClose(`opacity-${opacity}`)}
                opacity={opacity}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Z-Index Examples */}
      <section>
        <h2>Z-Index Examples</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Low Z-Index (10)</h3>
            <Button onClick={() => handleOpen('zIndex-low')}>
              Show Low Z-Index
            </Button>
            <Backdrop
              isOpen={openBackdrops['zIndex-low']}
              onClick={() => handleClose('zIndex-low')}
              opacity={50}
              zIndex={10}
            />
          </div>

          <div className={styles.item}>
            <h3>High Z-Index (100)</h3>
            <Button onClick={() => handleOpen('zIndex-high')}>
              Show High Z-Index
            </Button>
            <Backdrop
              isOpen={openBackdrops['zIndex-high']}
              onClick={() => handleClose('zIndex-high')}
              opacity={50}
              zIndex={100}
            />
          </div>
        </div>
      </section>

      {/* Complex Examples */}
      <section>
        <h2>Complex Examples</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>With Content</h3>
            <Button onClick={() => handleOpen('content')}>
              Show With Content
            </Button>
            <Backdrop
              isOpen={openBackdrops['content']}
              onClick={() => handleClose('content')}
              opacity={75}
              blur
            >
              <div className={styles.content}>
                <h4>Backdrop Content</h4>
                <p>This content is rendered inside the backdrop.</p>
                <Button onClick={() => handleClose('content')}>Close</Button>
              </div>
            </Backdrop>
          </div>

          <div className={styles.item}>
            <h3>Loading State</h3>
            <Button onClick={() => handleOpen('loading')}>Show Loading</Button>
            <Backdrop isOpen={openBackdrops['loading']} opacity={90} blur>
              <div className={styles.loading}>
                <div className={styles.spinner} />
                <p>Loading...</p>
              </div>
            </Backdrop>
          </div>

          <div className={styles.item}>
            <h3>Scroll Lock</h3>
            <Button onClick={() => handleOpen('scroll')}>
              Show With Scroll Lock
            </Button>
            <Backdrop
              isOpen={openBackdrops['scroll']}
              onClick={() => handleClose('scroll')}
              opacity={50}
              disableScroll
            />
          </div>
        </div>
      </section>
    </div>
  );
}
