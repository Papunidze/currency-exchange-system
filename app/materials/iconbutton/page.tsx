'use client';
import IconButton from '@app-shared/ui/iconButton';
import styles from './page.module.scss';

const IconButtonDemo = () => {
  // Sample icons using simple elements (replace with your actual icons)
  const icons = {
    add: <span>+</span>,
    edit: <span>✎</span>,
    delete: <span>×</span>,
    check: <span>✓</span>,
    warning: <span>!</span>,
    menu: <span>☰</span>,
  };

  const variants = [
    'primary',
    'secondary',
    'danger',
    'success',
    'warning',
    'ghost',
  ] as const;
  const sizes = ['small', 'medium', 'large'] as const;

  return (
    <div className={styles.container}>
      <h1>Icon Button Examples</h1>

      <section>
        <h2>Variants</h2>
        <div className={styles.row}>
          {variants.map((variant) => (
            <div key={variant} className={styles.item}>
              <IconButton
                icon={icons.add}
                variant={variant}
                aria-label={`${variant} button`}
              />
              <span className={styles.label}>{variant}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Sizes</h2>
        <div className={styles.row}>
          {sizes.map((size) => (
            <div key={size} className={styles.item}>
              <IconButton
                icon={icons.edit}
                size={size}
                aria-label={`${size} button`}
              />
              <span className={styles.label}>{size}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>States</h2>
        <div className={styles.row}>
          <div className={styles.item}>
            <IconButton icon={icons.check} aria-label="normal button" />
            <span className={styles.label}>Normal</span>
          </div>
          <div className={styles.item}>
            <IconButton
              icon={icons.check}
              disabled
              aria-label="disabled button"
            />
            <span className={styles.label}>Disabled</span>
          </div>
          <div className={styles.item}>
            <IconButton
              icon={icons.check}
              isLoading
              aria-label="loading button"
            />
            <span className={styles.label}>Loading</span>
          </div>
        </div>
      </section>

      <section>
        <h2>With Badge</h2>
        <div className={styles.row}>
          <div className={styles.item}>
            <IconButton
              icon={icons.menu}
              badgeCount={5}
              aria-label="notifications"
            />
            <span className={styles.label}>Badge: 5</span>
          </div>
          <div className={styles.item}>
            <IconButton
              icon={icons.menu}
              badgeCount={99}
              variant="secondary"
              aria-label="many notifications"
            />
            <span className={styles.label}>Badge: 99</span>
          </div>
          <div className={styles.item}>
            <IconButton
              icon={icons.menu}
              badgeCount={100}
              variant="danger"
              aria-label="overflow notifications"
            />
            <span className={styles.label}>Badge: 100+</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IconButtonDemo;
