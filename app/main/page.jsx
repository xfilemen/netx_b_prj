import styles from '/app/styles/main.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function MainPage() {
    return (
        <div className={styles.wrap}>
            <div className={styles.main_content}>
                <h2>디아이웨어 데이터 마케팅팀<br/><span className={styles.name}>홍길동</span>님, 반갑습니다 :)</h2>
                <div className={styles.status_list}>
                    <ul>
                        <li>전체 현황 <span className={`${styles.num} ${styles.blue_color}`}>10</span></li>
                        <li>접수 현황 <span className={styles.num}>1</span></li>
                        <li>진행 현황 <span className={styles.num}>1</span></li>
                        <li>취소/반려 현황 <span className={styles.num}>1</span></li>
                        <li>완료 현황 <span className={styles.num}>1</span></li>
                    </ul>
                </div>
                <div className={styles.link_menu}>
                    <ul>
                        <li>
                            <Link href={'/'}>
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
                            <Link href={'/'}>
                                <Image 
                                    src="/images/main/ico_reg.png"
                                    alt="인력 요청 아이콘"
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
                                    alt="인력 요청 아이콘"
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

