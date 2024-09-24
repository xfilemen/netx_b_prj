import styles from '/pages/styles/detail.module.css';
import Header from '/pages/components/header';
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
            src="/images/detail/detail_top_banner.png"
            alt=""
            width={1440}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}