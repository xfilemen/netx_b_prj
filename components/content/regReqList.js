import styles from '/pages/styles/detail.module.css';
import Image from 'next/image';

export default function RegularPage() {
  return (
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
          <div className={styles.left_section}>
            <div className={styles.title}>
              <h2>정규인력 요청·내역</h2>
              <button>Filter</button>
            </div>
          </div>
          <div className={styles.right_section}>
            right
          </div>
      </div>
    </div>
  );
}