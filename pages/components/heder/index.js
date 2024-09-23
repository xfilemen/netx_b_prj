import styles from '../styles/detail.module.css';
import Image from 'next/image';

export default function HeaderPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <Image 
              src="/images/detail/diware_logo_img.png"
              alt="DIware"
              width={91}
              height={22}
            />
        </h1>
      </div>
    </div>
  );
}