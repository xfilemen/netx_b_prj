"use client"

import React, { useState } from 'react';
import styles from '../styles/detail.module.css';
import Image from 'next/image';

export default function RegDetail({ item }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState([true]); // details 아코디언 상태 배열로 관리
  const [isStatusVisible, setStatusVisible] = useState(false); // 토글 상태 관리

  const getStatusText = (status) => {
    switch (status) {
      case 'register':
        return '접수';
      case 'progress':
        return '진행';
      case 'cancel':
        return '취소';
      case 'return':
        return '반려';
      case 'complete':
        return '완료';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    return styles[status] || '';
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return styles['h'];
      case 'Medium':
        return styles['m'];
      case 'Low':
        return styles['l'];
      default:
        return priority;
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleDetailsAccordion = (index) => {
    const updatedDetailsOpen = [...detailsOpen];
    updatedDetailsOpen[index] = !updatedDetailsOpen[index];
    setDetailsOpen(updatedDetailsOpen);
  };

  const handleStatusToggle = () => {
    setStatusVisible(!isStatusVisible); // 클릭 시 토글
  };


  return (
    item && (
      <div className={styles.detail_content}>
        <div className={`${styles.state} ${getStatusClass(item.reqStatus)}`}>
          {getStatusText(item.reqStatus)}
        </div>
        <h2>{item.reqTitle}</h2>
        <div className={styles.tx_info}>
          <div className={styles.priority}>
            유형 <span className={`${styles.prior} ${getPriorityClass(item.reqOrd)}`}>{item.reqOrd}</span>
          </div>
          <div className={styles.date}>요청일 {item.regDt.substring(0,10)}</div>
          <div className={styles.num}>요청인원 {item.reqHeadcount}명</div>
        </div>
        <div className={styles.progress_section}>
        {item.reqStatus == 'register' ?
          
            <ul>
              <li>✓ 접수</li>
              <li>진행</li>
              <li>완료</li>
            </ul>
          
          : item.reqStatus == 'progress' ?
              <ul>
                <li>✓ 접수</li>
                <li>✓ 진행</li>
                <li>완료</li>
              </ul>
            
            : item.reqStatus == 'cancel' ?
              <ul>
                <li>✓ 접수</li>
                <li>✓ 취소</li>
              </ul>
              :
              <ul>
                <li>✓ 접수</li>
                <li>✓ 진행</li>
                <li>✓ 완료</li>
              </ul>
        }
        {item.reqStatus == 'register' ?
          <progress className={styles.progressbar} value="33" min="0" max="100"></progress>
          : item.reqStatus == 'progress' ?
            <progress className={styles.progressbar} value="66" min="0" max="100"></progress>
            : item.reqStatus == 'cancel' ?
              <progress className={styles.progressbar} value="66" min="0" max="100"></progress>
              :
              <progress className={styles.progressbar} value="99" min="0" max="100"></progress>
        }
        </div>
        <div className={styles.detail_prog}>
          <button onClick={handleStatusToggle}>상세 진행 현황</button>
          <div className={styles.status_list} style={{ display: isStatusVisible ? 'block' : 'none' }}>
            <div className={styles.header}>
              상세 진행 현황
              <div className={styles.close_btn}>
                <a onClick={handleStatusToggle}>
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
        </div>
        {/* 기본 정보 아코디언 */}
        <div className={styles.accordion}>
          <div className={styles.title} onClick={toggleAccordion}>
            <h3>
              <Image
                src="/images/detail/ico_info.png"
                alt="요청 기본 정보"
                width={46}
                height={46}
              />
              요청 기본 정보
            </h3>
            <span>
              <Image
                src={isOpen ? "/images/detail/ico_ac_up.png" : "/images/detail/ico_ac_down.png"}
                alt={isOpen ? "닫기" : "열기"}
                width={12}
                height={6}
                className={styles.arrowIcon}
              />
            </span>
          </div>
          {!isOpen && (
            <div className={styles.content}>
              <ul>
                <li><span className={styles.tit_tx}>요청명</span><span className={styles.p_tx}>{item.reqName}</span></li>
                <li className={styles.half_line1}><span className={styles.tit_tx}>대내·외 구분</span><span className={styles.p_tx}>{item.reqType == 1 ? '대내' : '대외'}</span></li>
                <li className={styles.half_line2}><span className={styles.tit_tx}>인원</span><span className={styles.p_tx}>{item.reqHeadcount}명</span></li>
                <li><span className={styles.tit_tx}>목적</span><span className={styles.p_tx}>{item.reqPurp == 1 ? '구축' : item.reqPurp == 2 ? '운영' : item.reqPurp == 3 ? '개선/개발' : '기타'}</span></li>
              </ul>
            </div>
          )}
        </div>
        {/* 개별 details 정보 아코디언 */}
        {item.reqDet && item.reqDet.map((detail, index) => {
          const isDetailOpen = detailsOpen[index] || false;
          return (
            <div key={index} className={`${styles.accordion} ${styles.detail}`}>
              <div className={styles.title} onClick={() => toggleDetailsAccordion(index)}>
                <h3>
                  <Image
                    src="/images/detail/ico_partners.png"
                    alt="요청 기본 정보"
                    width={46}
                    height={46}
                  />
                  요청 인력 정보 <span className={styles.acc_num}>{index + 1}</span>
                </h3>
                <span>
                  <Image
                    src={isDetailOpen ? "/images/detail/ico_ac_up.png" : "/images/detail/ico_ac_down.png"}
                    alt={isDetailOpen ? "닫기" : "열기"}
                    width={12}
                    height={6}
                    className={styles.arrowIcon}
                  />
                </span>
              </div>
              {isDetailOpen && (
                <div className={styles.content}>
                  <ul>
                    <li className={styles.half_line1}><span className={styles.tit_tx}>유형</span><span className={styles.p_tx}>{detail.reqType}</span></li>
                    <li className={styles.half_line2}><span className={styles.tit_tx}>직무 구분</span><span className={styles.p_tx}>{detail.reqJob}</span></li>
                    <li><span className={styles.tit_tx}>등급</span><span className={styles.p_tx}>{detail.reqGrade}</span></li>
                    <li className={styles.half_line3}><span className={styles.tit_tx}>투입 예정일</span><span className={styles.p_tx}>{detail.reqInDt.substring(0,10)}</span></li>
                    <li className={styles.half_line4}><span className={styles.tit_tx}>투입 종료일</span><span className={styles.p_tx}>{detail.reqOutDt ? detail.reqOutDt.substring(0,10) : '미정'}</span></li>
                    <li className={styles.half_line3}><span className={styles.tit_tx}>M/M</span><span className={styles.p_tx}>{detail.reqMm}</span></li>
                    <li className={styles.half_line4}><span className={styles.tit_tx}>근무지</span><span className={styles.p_tx}>{detail.reqLoc}</span></li>
                    <li><span className={styles.tit_tx}>상세<br />요구기술</span><span className={styles.p_tx}>{detail.reqSkill}</span></li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    )
  );
}