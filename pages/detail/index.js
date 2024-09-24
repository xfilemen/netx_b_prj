import styles from '/pages/styles/detail.module.css';
import Header from '/components/header';
import Image from 'next/image';

export default function RegularPage() {
  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.topbanner}>
          <Image 
            src="/images/detail/TopVisual.png"
            alt="효율적인 인력배치 언제든 문의하세요"
            width={1440}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}