'use client';

import Select from '@app-shared/ui/select';
import styles from './page.module.scss';

export default function SelectDemo() {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ];

  const variants = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'ghost',
  ] as const;
  const sizes = ['small', 'medium', 'large'] as const;

  return (
    <div className={styles.container}>
      <h1>Select Component</h1>

      <section>
        <h2>Variants</h2>
        <div className={styles.grid}>
          {variants.map((variant) => (
            <div key={variant} className={styles.item}>
              <h3>{variant}</h3>
              <Select
                label={`${variant} select`}
                options={options}
                variant={variant}
                onChange={(value) => console.log(`${variant}:`, value)}
                placeholder={`Choose ${variant}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Sizes</h2>
        <div className={styles.grid}>
          {sizes.map((size) => (
            <div key={size} className={styles.item}>
              <h3>{size}</h3>
              <Select
                label={`${size} select`}
                options={options}
                size={size}
                onChange={(value) => console.log(`${size}:`, value)}
                placeholder={`Choose ${size}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>States</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Default</h3>
            <Select
              label="Default select"
              options={options}
              onChange={(value) => console.log('Default:', value)}
            />
          </div>

          <div className={styles.item}>
            <h3>With Helper Text</h3>
            <Select
              label="Helper text"
              options={options}
              helperText="This is a helper text"
              onChange={(value) => console.log('Helper:', value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Required</h3>
            <Select
              label="Required select"
              options={options}
              required
              onChange={(value) => console.log('Required:', value)}
            />
          </div>

          <div className={styles.item}>
            <h3>With Error</h3>
            <Select
              label="Error state"
              options={options}
              error="This field has an error"
              onChange={(value) => console.log('Error:', value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Disabled</h3>
            <Select
              label="Disabled select"
              options={options}
              disabled
              onChange={(value) => console.log('Disabled:', value)}
            />
          </div>

          <div className={styles.item}>
            <h3>With Default Value</h3>
            <Select
              label="Default value"
              options={options}
              defaultValue="option1"
              onChange={(value) => console.log('Default Value:', value)}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Width Variants</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Full Width</h3>
            <Select
              label="Full width select"
              options={options}
              fullWidth
              onChange={(value) => console.log('Full Width:', value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Auto Width</h3>
            <Select
              label="Auto width select"
              options={options}
              fullWidth={false}
              onChange={(value) => console.log('Auto Width:', value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
