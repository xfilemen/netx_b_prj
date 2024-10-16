import styles from '/app/styles/main.module.css';
import Image from 'next/image';

export const metadata = {
  title: '인력요청시스템',
}

export default function LoginPage() { 
  return (
    <div className={styles.container}>
      <div className={styles.loginbg}>
          <Image 
            src="/images/login/left_login_bg.png"
            alt="WORKFORCE REQUEST MANAGER SYSTEM"
            width={840}
            height={919}
          />
      </div>
    </div>
  );
}

