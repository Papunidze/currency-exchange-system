'use client';

import { useState } from 'react';
import { Textarea } from '@app-shared/ui/textarea';
import styles from './page.module.scss';

const sizes = ['small', 'medium', 'large'] as const;

export default function TextareaDemo() {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={styles.container}>
      <h1>Textarea Component</h1>

      {/* Basic Examples */}
      <section>
        <h2>Basic Examples</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Simple Textarea</h3>
            <Textarea
              label="Message"
              placeholder="Enter your message"
              onChange={(e) => handleChange('simple', e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <h3>With Helper Text</h3>
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself"
              helperText="Write a brief description about yourself"
              onChange={(e) => handleChange('helper', e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Required Field</h3>
            <Textarea
              label="Feedback"
              placeholder="Your feedback is important"
              required
              onChange={(e) => handleChange('required', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h2>Size Variants</h2>
        <div className={styles.grid}>
          {sizes.map((size) => (
            <div key={size} className={styles.item}>
              <h3>{size.charAt(0).toUpperCase() + size.slice(1)} Size</h3>
              <Textarea
                label={`${size} textarea`}
                placeholder={`This is a ${size} textarea`}
                size={size}
                onChange={(e) => handleChange(`size-${size}`, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* States */}
      <section>
        <h2>States</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Error State</h3>
            <Textarea
              label="Error Example"
              placeholder="This field has an error"
              isInvalid
              errorMessage="This field is required"
              onChange={(e) => handleChange('error', e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Success State</h3>
            <Textarea
              label="Success Example"
              placeholder="This field is valid"
              isValid
              helperText="Everything looks good!"
              onChange={(e) => handleChange('success', e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Disabled State</h3>
            <Textarea
              label="Disabled Example"
              placeholder="This field is disabled"
              disabled
              value="This textarea is disabled"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2>Features</h2>
        <div className={styles.grid}>
          <div className={styles.item}>
            <h3>Character Counter</h3>
            <Textarea
              label="Limited Input"
              placeholder="Type something..."
              maxLength={100}
              showCount
              onChange={(e) => handleChange('counter', e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Auto Resize</h3>
            <Textarea
              label="Auto-resizing"
              placeholder="This textarea will grow as you type..."
              autoResize
              onChange={(e) => handleChange('resize', e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <h3>Width Variants</h3>
            <Textarea
              label="Full Width"
              placeholder="This textarea takes full width"
              fullWidth
              onChange={(e) => handleChange('full-width', e.target.value)}
            />
            <div style={{ marginTop: '1rem' }}>
              <Textarea
                label="Auto Width"
                placeholder="This textarea has auto width"
                fullWidth={false}
                onChange={(e) => handleChange('auto-width', e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
