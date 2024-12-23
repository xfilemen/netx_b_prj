import styles from '@styles/detail.module.css';
import Header from '@components/header';
import Footer from '@components/footer';

export default function DetailLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
