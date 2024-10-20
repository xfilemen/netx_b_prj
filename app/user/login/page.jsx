'use client';

import { useEffect, useState } from 'react';
import styles from '/app/styles/main.module.css';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() { 

  const [cj_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();

  console.log("session : " + session['user']);
  if(session['user']){
    try {
      signOut({ redirect: false });
    } catch (error) {
      console.error(error);
    }
  }
  // useEffect(function() {
  //   console.log(session);
  //   if(session){
  //     try {
  //       signOut({ redirect: false });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: false,
      cj_id,
      password,
    })

    if (result.error) {
      console.log(result.error);
      alert(result.error);

    } else {
      window.location.href = "/main" 
    }
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.loginbg}>
          <img src="/images/login/left_login_bg.jpg" alt="WORKFORCE REQUEST MANAGER SYSTEM"/>
        </div>
        <div className={styles.loginSection}>
          <div className={styles.content}>
              <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                  type="text"
                  placeholder="CJ World 계정"
                  value={cj_id}
                  onChange={(e) => setUsername(e.target.value)}
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
    </div>
  );
}

