import styles from '/app/styles/detail.module.css';
import NaviList from '/app/components/navigation.jsx';
import Image from 'next/image';

export default function HeaderPage() {
  return (
    <div className={styles.header}>
      <h1>
        <Image 
            src="/images/detail/diware_logo_img.png"
            alt="DIware"
            width={91}
            height={22}
          />
      </h1>
      <div className={styles.navigation}>
        <NaviList />
      </div>
    </div>
  );
}