
import prisma from '/lib/prisma';
import {getSession} from '@utils/data-access';
import styles from '@styles/main.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {

    const {user} = await getSession();
    let data = {}
    let where = {}
    try {
        //요청자일 때는 본인 요청내역만 조회
        if(user.authCd == 'request'){
        where = { 
            regId : user.userId
        }
        }
        const rowdata = await prisma.tbReqMgt.findMany({
        where,
        select: {
            reqStatus: true,
        },
        })

        
        data = {
            requstData: rowdata,
            registerCount: rowdata.filter(item => item.reqStatus === 'register').length,
            progressCount: rowdata.filter(item => item.reqStatus === 'progress').length,
            cancelCount: rowdata.filter(item => item.reqStatus === 'cancel'|| item.reqStatus === 'return').length,
            completeCount: rowdata.filter(item => item.reqStatus === 'complete').length,
        };
    } catch(error){
        console.log(error)
    }


    return (
        <div className={styles.wrap}>
            <div className={styles.main_content}>
                <h2>{user.compName} {user.deptName}<br/><span className={styles.name}>{user.userName}</span>님, 반갑습니다 :)</h2>
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