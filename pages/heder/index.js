import styles from './pages/styles/detail.module.css';
import Image from 'next/image';

export default function HeaderPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <Image 
              src="/images/detail/diware_logo_img.png"
              alt="DIware"
            />
        </h1>
      </div>      
      <p>This is the deteil page.</p>
    </div>
  );
}