import Input from '@app-shared/ui/input';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.main}>
          <h1 className={styles.title}>Input Component Demo</h1>

          <section className={styles.demoSection}>
            <h2>Input Sizes</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Input
                  label="Small Input"
                  placeholder="Small input..."
                  size="small"
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="Medium Input"
                  placeholder="Medium input..."
                  size="medium"
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="Large Input"
                  placeholder="Large input..."
                  size="large"
                />
              </div>
            </div>
          </section>

          <section className={styles.demoSection}>
            <h2>Validation States</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Input
                  label="Default Input"
                  placeholder="Type here..."
                  helperText="This is a helper text"
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="Valid Input"
                  placeholder="Valid input..."
                  isValid={true}
                  helperText="This input is valid"
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="Invalid Input"
                  placeholder="Invalid input..."
                  isInvalid={true}
                  errorMessage="This input is invalid"
                />
              </div>
            </div>
          </section>

          <section className={styles.demoSection}>
            <h2>Input with Icons</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Input
                  label="Input with Start Icon"
                  placeholder="Search..."
                  startContent={<div style={{ padding: '0 4px' }}>🔍</div>}
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="Input with End Icon"
                  placeholder="Enter email..."
                  endContent={<div style={{ padding: '0 4px' }}>✉️</div>}
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="Input with Both Icons"
                  placeholder="Enter amount..."
                  startContent={<div style={{ padding: '0 4px' }}>$</div>}
                  endContent={<div style={{ padding: '0 4px' }}>💰</div>}
                />
              </div>
            </div>
          </section>

          <section className={styles.demoSection}>
            <h2>Special States</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Input
                  label="Disabled Input"
                  placeholder="Cannot edit..."
                  disabled={true}
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="Required Input"
                  placeholder="This field is required..."
                  required={true}
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  label="With Default Value"
                  defaultValue="Pre-filled value"
                />
              </div>
            </div>
          </section>

          <section className={styles.demoSection}>
            <h2>Other Input Types</h2>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>
                <Input
                  type="password"
                  label="Password Input"
                  placeholder="Enter password..."
                />
              </div>

              <div className={styles.demoItem}>
                <Input
                  type="number"
                  label="Number Input"
                  placeholder="Enter number..."
                />
              </div>

              <div className={styles.demoItem}>
                <Input type="date" label="Date Input" />
              </div>
            </div>
          </section>

          <section className={styles.demoSection}>
            <h2>Width Variants</h2>
            <div>
              <div className={styles.demoItem} style={{ maxWidth: '300px' }}>
                <Input
                  label="Fixed Width (300px)"
                  placeholder="Fixed width input..."
                  fullWidth={true}
                />
              </div>

              <div className={styles.demoItem} style={{ marginTop: '16px' }}>
                <Input
                  label="Full Width"
                  placeholder="This input takes full container width..."
                  fullWidth={true}
                />
              </div>

              <div
                className={styles.demoItem}
                style={{ marginTop: '16px', display: 'inline-block' }}
              >
                <Input
                  label="Auto Width"
                  placeholder="Auto width..."
                  fullWidth={false}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
