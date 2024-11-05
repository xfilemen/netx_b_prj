'use client'

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import styles from '@styles/main.module.css';
import Image from 'next/image';
import Link from 'next/link';
import apiHandler from '../../utils/api-handler';

export default function MainPage() {
    const { data: session } = useSession();
    const [error, setError] = useState(null);

     // useState를 사용하여 하나의 객체로 상태 관리
    const [data, setData] = useState({
        requstData: [],
        registerCount: 0,
        progressCount: 0,
        cancelCount: 0,
        completeCount: 0,
    });
    
    let userInfo = {};
    userInfo = session?.user || {};
    console.log(userInfo);
    console.log('📢 [page.jsx:29]', session);

    
    const submitData = async () => {
        try {
          const result = await apiHandler.postData('/api/req/status'); // POST 요청

          if(result.data === undefined){
            setError(error);
    
          }else{
            console.log(result.data);
            const rowdata = result.data;

            // 새로운 요청 데이터를 기반으로 카운트 업데이트
            setData({
                requstData: rowdata,
                registerCount: rowdata.filter(item => item.reqStatus === 'register').length,
                progressCount: rowdata.filter(item => item.reqStatus === 'progress').length,
                cancelCount: rowdata.filter(item => item.reqStatus === 'cancel'|| item.reqStatus === 'return').length,
                completeCount: rowdata.filter(item => item.reqStatus === 'complete').length,
            });
    
          }
        } catch (error) {
          console.log('error',error);
          setError(error);
        }
    };

     useEffect(() => {
        submitData();
     }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.main_content}>
                <h2>{userInfo.compName} {userInfo.deptName}<br/><span className={styles.name}>{userInfo.userName}</span>님, 반갑습니다 :)</h2>
                <div className={styles.status_list}>
                    <ul>
                        <li>전체 현황 <span className={`${styles.num} ${styles.blue_color}`}>{data.requstData.length}</span></li>
                        <li>접수 현황 <span className={styles.num}>{data.registerCount}</span></li>
                        <li>진행 현황 <span className={styles.num}>{data.progressCount}</span></li>
                        <li>취소/반려 현황 <span className={styles.num}>{data.cancelCount}</span></li>
                        <li>완료 현황 <span className={styles.num}>{data.completeCount}</span></li>
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
                                <span className={`${styles.tx} ${styles.line1}`}>인력 요청하기</span>
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
                                <span className={`${styles.tx} ${styles.line1}`}>요청 내역 확인하기</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/notice'}>
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

