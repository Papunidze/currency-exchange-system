import Link from 'next/link';
import styles from './left-bar.module.scss';

const LeftBar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.brand}>
        <h1 className={styles.brandTitle}>Currency Exchange</h1>
      </div>

      <ul className={styles.navigation}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            <span className={styles.navIcon}>🏠</span>
            <span className={styles.navText}>Dashboard</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/exchange" className={styles.navLink}>
            <span className={styles.navIcon}>💱</span>
            <span className={styles.navText}>Exchange</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/rates" className={styles.navLink}>
            <span className={styles.navIcon}>📊</span>
            <span className={styles.navText}>Rates</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/history" className={styles.navLink}>
            <span className={styles.navIcon}>📜</span>
            <span className={styles.navText}>History</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/reports" className={styles.navLink}>
            <span className={styles.navIcon}>📈</span>
            <span className={styles.navText}>Reports</span>
          </Link>
        </li>
      </ul>

      <div className={styles.userSection}>
        <Link href="/profile" className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <span>👤</span>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>John Doe</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default LeftBar;
