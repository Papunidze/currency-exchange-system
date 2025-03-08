import React from 'react';
import styles from './page.module.scss';
import Button from '@app-shared/ui/button';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.main}>
          <h1 className={styles.title}>Button Component Demo</h1>

          {/* Standard Button Variants */}
          <section className={styles.demoSection}>
            <h2>Button Variants</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Button variant="primary">Primary Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="secondary">Secondary Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="danger">Danger Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="success">Success Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="warning">Warning Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="outlined">Outlined Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
          </section>

          {/* Button Sizes */}
          <section className={styles.demoSection}>
            <h2>Button Sizes</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Button size="small">Small Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button size="medium">Medium Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button size="large">Large Button</Button>
              </div>
            </div>
          </section>

          <section className={styles.demoSection}>
            <h2>Buttons with Icons</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Button startIcon={<span>👋</span>}>Start Icon</Button>
              </div>

              <div className={styles.demoItem}>
                <Button endIcon={<span>🚀</span>}>End Icon</Button>
              </div>

              <div className={styles.demoItem}>
                <Button startIcon={<span>📥</span>} endIcon={<span>📤</span>}>
                  Both Icons
                </Button>
              </div>
            </div>
          </section>

          <section className={styles.demoSection}>
            <h2>Button States</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Button disabled>Disabled Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button isLoading>Loading Button</Button>
              </div>

              <div className={styles.demoItem}>
                <Button isLoading>Loading Variant</Button>
              </div>
            </div>
          </section>

          {/* Full Width Buttons */}
          <section className={styles.demoSection}>
            <h2>Full Width Buttons</h2>
            <div className={styles.demoFlex}>
              <div className={styles.demoItem} style={{ width: '100%' }}>
                <Button fullWidth>Full Width Button</Button>
              </div>

              <div
                className={styles.demoItem}
                style={{ width: '100%', marginTop: '16px' }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<span>📱</span>}
                >
                  Full Width with Icon
                </Button>
              </div>
            </div>
          </section>

          {/* Combined Variants */}
          <section className={styles.demoSection}>
            <h2>Combined Examples</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Button variant="primary" size="large">
                  Save Changes
                </Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="danger" size="small" endIcon={<span>🗑️</span>}>
                  Delete
                </Button>
              </div>

              <div className={styles.demoItem}>
                <Button variant="success" startIcon={<span>✓</span>} isLoading>
                  Processing...
                </Button>
              </div>
            </div>
          </section>

          {/* Button Groups */}
          <section className={styles.demoSection}>
            <h2>Button Groups</h2>
            <div className={styles.buttonGroup}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="danger">Decline</Button>
              <Button variant="primary">Accept</Button>
            </div>
          </section>

          {/* Responsive Buttons */}
          <section className={styles.demoSection}>
            <h2>Responsive Buttons</h2>
            <div className={styles.responsiveDemo}>
              <p>
                Resize your window to see how buttons respond to different
                screen sizes
              </p>
              <div className={styles.responsiveButtons}>
                <Button
                  variant="primary"
                  className={styles.responsiveButton}
                  startIcon={<span>📱</span>}
                >
                  Responsive Button
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
