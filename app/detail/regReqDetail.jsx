"use client"

import React, { useState } from 'react';
import styles from '../styles/detail.module.css';
import Image from 'next/image';

export default function RegDetail({ item }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState([true]); // details 아코디언 상태 배열로 관리

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

  return (
    item && (
      <div className={styles.detail_content}>
        <div className={`${styles.state} ${getStatusClass(item.reqStatus)}`}>
          {getStatusText(item.reqStatus)}
        </div>
        <h2>{item.reqTitle}</h2>
        <div className={styles.tx_info}>
          <div className={styles.priority}>
            우선순위 <span className={`${styles.prior} ${getPriorityClass(item.reqOrd)}`}>{item.reqOrd}</span>
          </div>
          <div className={styles.date}>요청일 {item.regDt.substring(0,10)}</div>
          <div className={styles.num}>요청인원 {item.reqHeadcount}명</div>
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
                <li className={styles.half_line1}><span className={styles.tit_tx}>대내·외 구분</span><span className={styles.p_tx}>{item.internalExternal}</span></li>
                <li className={styles.half_line2}><span className={styles.p_tx}>인원</span><span className={styles.p_tx}>{item.reqHeadcount}명</span></li>
                <li><span className={styles.tit_tx}>목적</span><span className={styles.p_tx}>{item.reqPurp}</span></li>
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
                    <li className={styles.half_line2}><span className={styles.p_tx}>직무 구분</span><span className={styles.p_tx}>{detail.reqJob}</span></li>
                    <li><span className={styles.tit_tx}>등급</span><span className={styles.p_tx}>{detail.reqGrade}</span></li>
                    <li className={styles.half_line3}><span className={styles.tit_tx}>투입 예정일</span><span className={styles.p_tx}>{detail.reqInDt.substring(0,10)}</span></li>
                    <li className={styles.half_line4}><span className={styles.tit_tx}>투입 종료일</span><span className={styles.p_tx}>{detail.reqOutDt}</span></li>
                    <li className={styles.half_line3}><span className={styles.tit_tx}>M/M</span><span className={styles.p_tx}>{detail.reqMm}</span></li>
                    <li className={styles.half_line4}><span className={styles.p_tx}>근무지</span><span className={styles.p_tx}>{detail.reqLoc}</span></li>
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