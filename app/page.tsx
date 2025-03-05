import LeftBar from '@app-shared/components/left-bar';
import TopBar from '@app-shared/components/top-bar';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.barContainer}>
        <TopBar />
        <aside className={styles.sidebar}>
          <LeftBar />
        </aside>
      </section>

      <div className={styles.mainContent}>
        <main className={styles.dashboard}>
          <div className={styles.dashboardGrid}>
            <section className={`${styles.card} ${styles.exchangeSection}`}>
              <h2 className={styles.cardTitle}>Currency Exchange</h2>
              <div className={styles.cardContent}>
                <div className={styles.exchangeCalculator}></div>
                <div className={styles.currentRates}></div>
              </div>
            </section>

            <section className={`${styles.card} ${styles.reportsSection}`}>
              <h2 className={styles.cardTitle}>Reports & History</h2>
              <div className={styles.cardContent}>
                <div className={styles.exchangeHistory}></div>
                <div className={styles.reportsList}></div>
              </div>
            </section>
          </div>

          <section className={`${styles.card} ${styles.profitSection}`}>
            <h2 className={styles.cardTitle}>Profit Analysis</h2>
            <div className={styles.cardContent}>
              <div className={styles.profitCalculation}></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
