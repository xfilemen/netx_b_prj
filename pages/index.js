import { useState, useEffect } from 'react';
import styles from './styles/main.module.css';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div>
        <Image 
          src="/images/loginbg.png" // 이미지 경로
          alt="로그인 페이지"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}