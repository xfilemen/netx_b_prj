import styles from '/app/styles/main.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() { 
  return (
    <div className={styles.container}>
      <div className={styles.loginbg}>
        <Link href="/detail">
          <Image 
            src="/images/login/loginbg.png"
            alt="로그인 페이지"
            width={800}
            height={800}
          />
        </Link>
      </div>
    </div>
  );
}