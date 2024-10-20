"use client";

import React, { useState } from 'react';
import RegDetail from '../detail/regReqDetail.jsx';
import requstData from '../data/regRequstList.json';
import styles from '../styles/detail.module.css';
import Image from 'next/image';

export default function RegularPage({ item }) {
  const [listSelectIdx, setListSelectIdx] = useState(null); // li on 포커스
  const [pageSelectItem, setPageSelectItem] = useState(null); // 정규인력 요청·내역 상세페이지 연결

  const showDetailPage = (index, item) => {
    setListSelectIdx(index);
    setPageSelectItem(item);
    console.log(index, item);
  };

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
        return status; // 다른 상태는 원래 값을 사용
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
        return '';
    }
  };
  return (
    <div className={styles.content}>
      <div className={styles.topbanner}>
        <Image 
          src="/images/detail/TopVisual.png"
          alt="효율적인 인력배치 언제든 문의하세요"
          width={1440}
          height={150}
        />
      </div>
      <div className={styles.wrap}>
        <div className={styles.left_section}>
          <div className={styles.title}>
            <h2>정규인력 요청·내역</h2>
            <p className={styles.tit_tx}>요청 내역을 확인하실 수 있습니다.</p>
            {/* <div className={styles.btn}>
              <button>Filter</button>
            </div> */}
          </div>
          <div className={styles.item_list}>
            <div className={styles.list_items}>
              <ul>
                {requstData.length > 0 ? (
                  requstData.map((item, index) => (
                    <li key={item.id} onClick={() => showDetailPage(index, item)} className={`${listSelectIdx === index ? styles.on : ''}`}>
                      <div className={`${styles.state} ${getStatusClass(item.status)}`}>
                        {getStatusText(item.status)}
                      </div>
                      <div className={styles.section}>
                        <p className={styles.tit_tx}>{item.title}</p>
                        <div className={styles.tx_info}>
                          <div className={styles.priority}>우선순위 <span className={`${styles.prior} ${getPriorityClass(item.priority)}`}>{item.priority}</span></div>
                          <div className={styles.date}>요청일 {item.date}</div>
                          <div className={styles.num}>요청인원 {item.requestedBy}명</div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className={styles.nodata}>데이터가 없습니다.</li>
                )}
              </ul>
            </div>
          </div>
        </div><div className={styles.right_section}>
            <RegDetail item={pageSelectItem} />
        </div>
      </div>
    </div>
  );
}