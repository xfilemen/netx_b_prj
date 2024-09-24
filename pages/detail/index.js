import styles from '/pages/styles/detail.module.css';
import Header from '/components/header';
import Footer from '/components/footer';
import Image from 'next/image';

export default function RegularPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.topbanner}>
          <Image 
            src="/images/detail/TopVisual.png"
            alt="효율적인 인력배치 언제든 문의하세요"
            width={1440}
            height={150}
          />
        </div>
        <div className={styles.wrap}>
            1212
        </div>
      </div>
      <Footer />
    </div>
  );
}