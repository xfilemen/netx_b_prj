import React, { useState } from 'react';
import styles from '@styles/detail.module.css';
import Image from 'next/image';

export default function DetailStatusPage({onClose}) {
  return (
    <div className={styles.status_list}>
        <div className={styles.header}>
            상세 진행 현황
            <div className={styles.close_btn}>
            <a onClick={onClose}>
                <Image
                    src="/images/detail/close_btn.png"
                    alt="닫기"
                    width={24}
                    height={24}
                />
            </a>
            </div>
        </div>
        <div className={styles.content}>
            <ul>
                <li>
                <div className={styles.line}><span className={styles.name}>[처리자] 디아이웨어 김열정님</span> | 2024-07-30 15:00</div>
                <div>❗ 정규 인력 요청 완료</div>
                </li>
                <li>
                <div className={styles.line}><span className={styles.name}>[처리자] 디아이웨어 김열정님</span> | 2024-07-30 15:00</div>
                <div>✍ 김철수님 9/30(월) 채용 확정 </div>
                </li>
                <li>
                <div className={styles.line}><span className={styles.name}>[처리자] 디아이웨어 김열정님</span> | 2024-07-30 15:00</div>
                <div>✍ 후보 1명 (김철수님) 9/12(목) 면접 예정 </div>
                </li>
                <li>
                <div className={styles.line}><span className={styles.name}>[처리자] 디아이웨어 김열정님</span> | 2024-07-30 15:00</div>
                <div>✍ 최성실님에게 정규직 프로필 요청 후 회신 <br/>
                대기중 최성실님에게 정규직 프로필 요청 후 회신 대기중 최성실님에게 정규직 프로필 요청 후 회신 대기중 최성실님에게 정규직 프로필 요청 후 회신 대기중 </div>
                </li>
                <li>
                <div className={styles.line}><span className={styles.name}>[요청자] 디아이웨어 김열정님</span> | 2024-07-30 15:00</div>
                <div>❗ 정규 인력 요청 진행</div>
                </li>
            </ul>
        </div>
        <div className={styles.comment_section}>
            <textarea placeholder="코멘트를 입력해 주세요." name="" id=""></textarea>
            <button>comment</button>
        </div>
    </div>
  );
}