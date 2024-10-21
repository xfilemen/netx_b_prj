'use client'

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import requstData from '../data/regRequstList.json';
import styles from '/app/styles/main.module.css';
import Image from 'next/image';
import Link from 'next/link';



export default function MainPage() {
    const { data: session } = useSession();
    const registerCount = requstData.filter(item => item.status === 'register').length;
    const progressCount = requstData.filter(item => item.status === 'progress').length;
    const cancelCount = requstData.filter(item => item.status === 'return' || item.status === 'cancel').length;
    const completeCount = requstData.filter(item => item.status === 'complete').length;

    let userInfo = {};
    userInfo = session?.user || {};

    console.log(userInfo);
     useEffect(() => {
        console.log(userInfo);
     }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.main_content}>
                <h2>{userInfo.compName} {userInfo.deptName}<br/><span className={styles.name}>{userInfo.userName}</span>님, 반갑습니다 :)</h2>
                <div className={styles.status_list}>
                    <ul>
                        <li>전체 현황 <span className={`${styles.num} ${styles.blue_color}`}>{requstData.length}</span></li>
                        <li>접수 현황 <span className={styles.num}>{registerCount}</span></li>
                        <li>진행 현황 <span className={styles.num}>{progressCount}</span></li>
                        <li>취소/반려 현황 <span className={styles.num}>{cancelCount}</span></li>
                        <li>완료 현황 <span className={styles.num}>{completeCount}</span></li>
                    </ul>
                </div>
                <div className={styles.link_menu}>
                    <ul>
                        <li>
                            <Link href={'/request'}>
                                <Image 
                                    src="/images/main/ico_req.png"
                                    alt="인력 요청 아이콘"
                                    width={46}
                                    height={46}
                                />
                                <span className={styles.tx}>정규/BP<br/>인력 요청하기</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/detail'}>
                                <Image 
                                    src="/images/main/ico_reg.png"
                                    alt="인력 내역 확인 아이콘"
                                    width={46}
                                    height={46}
                                />
                                <span className={styles.tx}>정규/BP 인력<br />요청 내역 확인하기</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <Image 
                                    src="/images/main/ico_noti.png"
                                    alt="공지사항 아이콘"
                                    width={46}
                                    height={46}
                                />
                                <span className={`${styles.tx} ${styles.line1}`}>공지사항</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

