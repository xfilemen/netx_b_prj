import styles from '@styles/detail.module.css';
import Header from '@components/header';
import Footer from '@components/footer';

export const metadata = {
  title: '인력요청시스템',
}


export default function RegistLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
