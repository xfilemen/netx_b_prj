import styles from '/app/styles/main.module.css';

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
            </div>
        </div>
    )
}

