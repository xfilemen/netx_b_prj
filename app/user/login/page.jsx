'use client';

import { useEffect, useState } from 'react';
import styles from '/app/styles/main.module.css';
import Image from 'next/image';

export default function LoginPage() { 

  const [cj_id, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cj_id, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      location.href = '/main';
    } else {
      alert(data.message);
    }
  };

  const test = () => {
    location.href = '/detail';
  }

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
      <div className={styles.loginSection}>
        <div className={styles.content}>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input
                type="text"
                placeholder="CJ World 계정"
                value={cj_id}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={styles.saveid}>
                <input
                  type="checkbox"
                  placeholder="아이디 저장"
                /> <span className={styles.saveidtx}>아이디 저장</span>
              </div>
              <button type="submit">로그인</button>
            </form>
            <div className={styles.join_section}>
              <ul>
                <li>계정찾기</li>
                <li className={styles.line}>ㅣ</li>
                <li>비밀번호 찾기</li>
                <li className={styles.line}>ㅣ</li>
                <li>계정생성 요청</li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}

