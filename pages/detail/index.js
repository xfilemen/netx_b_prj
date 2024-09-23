import styles from './pages/styles/detail.module.css';
import Header from './pages/components/header';

export default function RegularPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>      
      <p>This is the deteil page.</p>
    </div>
  );
}