import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import styles from '@styles/detail.module.css';
import apiHandler from '../../utils/api-handler.js'; 
import Image from 'next/image';

export default function DetailStatusPage({onClose}) {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  let userInfo = {};
  userInfo = session?.user || {};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const tbReqMgtLog = async () => {
      try {
        await apiHandler.fetchPostData('/api/req/log/list', {
          data: { reqId: 4 }, // 요청내역 reqId 변수
        }, (result, error) => {
          if (result?.data) {
            console.log('tbReqMgtLog', result.data);
            setData(Array.isArray(result.data) ? result.data : [result.data]);
          } else {
            console.log('No data found', result); // 응답 객체 구조 확인
          }          
        });
      } catch (error) {
        console.error('AxiosError', error);
      }
    };
    tbReqMgtLog();
  }, []);

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
            {data.map((item, index) => (
              <li key={index}>
                <div className={styles.line}><span className={styles.name}>[처리자] 디아이웨어 {item.tbUserReg.userName}님</span> | {formatDate(item.regDt)}</div>
                <div>{item.reqLogDesc}</div>
              </li>
            ))}
          </ul>
            {/* <ul>
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
            </ul> */}
        </div>
        {userInfo.authCd == 'approve' ? (
          <div className={styles.comment_section}>
              <textarea placeholder="코멘트를 입력해 주세요." name="" id=""></textarea>
              <button>comment</button>
          </div>
        ) : (
          ""
        )}
    </div>
  );
}