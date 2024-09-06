import { useState, useEffect } from 'react';
import styles from './styles/main.module.css';
import loginImage from './images/loginbg.png'; // 이미지 파일 경로

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.loginimg}>
        <Image
          src={loginImage} // 이미지 경로
          alt="로그인 페이지"
        />
      </div>
    </div>
  );
}