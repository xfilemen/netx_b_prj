import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles/main.module.css';
import Image from 'next/image';

export default function LoginPage() { 
  return (
    <div className={styles.container}>
      <div className={styles.loginbg}>
        <Link href="/detail">
          <Image 
            src="/images/login/loginbg.png"
            alt="로그인 페이지"
          />
        </Link>
      </div>
    </div>
  );
}