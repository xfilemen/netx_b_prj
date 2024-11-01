'use client';

import { useEffect, useState } from 'react';
import styles from '/app/styles/main.module.css';
import { signIn, signOut } from "next-auth/react";
import Modal from '../login/modal';
import Link from 'next/link';

export default function LoginPage() { 
  const [cj_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
      //아이디 저장 체크 여부 확인
      if(isChecked) {
        localStorage.setItem('cj_id', cj_id);
      }else{
        localStorage.removeItem('cj_id');
      }

      window.location.href = "/main" 
    }
  }

  const openModal = (type) => {
    setModalType(type); // 모달 타입 설정
    setIsModalOpen(true); // 모달 열기
  };
  
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setModalType(null); // 모달 타입 초기화
  };

  const idCheck = (e) => {
    setIsChecked(e.target.checked); 
  }



  useEffect(() => {
    // 저장된 아이디 있으면 화면에 셋팅
    const storedId = localStorage.getItem('cj_id');
    if (storedId) {
      setUsername(storedId);    
      setIsChecked(true);
    }else{
      localStorage.removeItem('cj_id');
    }
  }, []);

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
                <div className={styles.saveid}><input
                    type="checkbox"
                    checked={isChecked}
                    placeholder="아이디 저장"
                    onChange={idCheck}
                  /> <span className={styles.saveidtx}>아이디 저장</span>
                </div>
                <button type="submit" className={styles.login_btn}>로그인</button>
              </form>
              <div className={styles.join_section}>
                <ul>
                  <li>
                    <button onClick={() => openModal('requestAccount')}>계정생성 요청</button>
                  </li>
                  <li className={styles.line}>ㅣ</li>
                  <li>
                    <button onClick={() => openModal('findPassword')}>비밀번호 찾기</button>
                  </li>
                </ul>
              </div>
              {isModalOpen && <Modal type={modalType} />}
            </div>
        </div>
      </div>
    </div>
  );
}

