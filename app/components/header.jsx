"use client";
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation';
import styles from "@styles/header.module.css";
import NaviList from '@components/navigation.jsx';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderPage() {
  const pathname = usePathname();
  const showNaviList = pathname !== '/main';
  const { data: session } = useSession();
  let userInfo = {};
  userInfo = session?.user || {};

  const [isUserInfoVisible, setUserInfoVisible] = useState(false); // 토글 상태 관리

  const handleUserInfoToggle = () => {
    setUserInfoVisible(!isUserInfoVisible); // 클릭 시 토글
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/user/login' }); // 로그아웃 처리
  };

  useEffect(() => {
    console.log(session);
  }, [session]);


  return (
    <div className={styles.header}>
      <h1>
        <Link href={"/main"}>
          <Image 
            src="/images/detail/diware_logo_img.png"
            alt="DIware"
            width={91}
            height={22}
          />
        </Link>
      </h1>
      <div className={styles.navi_secition}>
        {showNaviList && (
          <div className={styles.navigation}>
            <NaviList />
          </div>
        )}
        <div className={styles.user_info_section}>
          <div className={styles.user_info} onClick={handleUserInfoToggle}>
              <Image 
                src="/images/ico/ico_user_blt.png"
                alt=""
                width={18}
                height={20}
              />
              {userInfo.userName ? `${userInfo.userName}님` : ''}
          </div>
          <div className={styles.user_detail_info} style={{ display: isUserInfoVisible ? 'block' : 'none' }}>
              <Image 
                src="/images/ico/ico_user_blt.png"
                alt=""
                width={46}
                height={51}
              />
              <div className={styles.user_info_tx}>
                  {userInfo.userName ? `${userInfo.userName}님` : ''}
                <span className={styles.type_req_tx}>({userInfo.authName})</span>
              </div>
              <div className={styles.team_info_tx}>{userInfo.compName}<br/>{userInfo.deptName}</div>
              <div className={styles.logout_btn}>
                <Link href={'/myinfo'} className={styles.info_btn}>정보수정</Link>
                <button onClick={handleSignOut}>로그아웃</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}