"use client"

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '/app/styles/myinfo.module.css';
import SelectBox from '../components/select';
import Image from 'next/image';

export default function myInfoPage() {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("데이터마케팅팀");
  let userInfo = {};
  userInfo = session?.user || {};
  useEffect(() => {
    console.log(session);
  }, [session]);
  
  // 그룹
  const groupType = [
    { value: 1, label: '디아이웨어' },
    { value: 2, label: 'CJ 올리브네트웍스' },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.content}>
        <div className={styles.topbanner}>
            <Image 
                src="/images/detail/TopVisual.png"
                alt="효율적인 인력배치 언제든 문의하세요"
                width={1440}
                height={150}
            />
        </div>
        <div className={styles.wrap}>
            <h2>나의 정보</h2>
            <div className={styles.myinfo_detail}>
                <div className={styles.item_half}>                    
                    <span className={styles.tx}>계정 구분</span>
                    <span className={styles.p_tx}>{userInfo.authName}</span>
                </div>
                <div className={styles.item_half}>
                    <span className={styles.tx}>이름</span>
                    <span className={styles.p_tx}>{userInfo.userName}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.tx}>CJ World 계정</span>
                    <span className={styles.p_tx}>gildong.hong@cj.net </span>
                </div>
                <div className={styles.item_half1}>                    
                    <span className={styles.tx}>그룹사</span>
                    <span className={styles.p_tx}>
                        <SelectBox options={groupType} name="groupType"/>
                    </span>
                </div>
                <div className={styles.item_half1}>
                    <span className={styles.tx}>소속</span>
                    <span className={styles.p_tx}>
                        <input type="text" className={styles.txt} value={inputValue} onChange={handleInputChange}/>
                    </span>
                </div>
                <div className={styles.item_pd}>
                    <span className={styles.tx}>비밀번호</span>
                    <span className={styles.p_tx}>
                        <input type="password" className={styles.txt}/>
                    </span>
                </div>
                <div className={`${styles.item_pd} ${styles.no_line}`}>
                    <span className={styles.tx}>비밀번호 확인</span>
                    <span className={styles.p_tx}>
                        <input type="password" className={styles.txt}/>
                    </span>
                </div>
            </div>
            <div className={styles.btn_section}>
                <button className={styles.cancel_btn}>취소</button>
                <button className={styles.aply_btn}>수정</button>
            </div>
        </div>
    </div>
  )
}