"use client";

import React, { useState } from 'react';
import styles from '../styles/request.module.css';
import SelectBox from '../components/select';
import Image from 'next/image';

export default function RegPage() { 
  const [isOpen, setIsOpen] = useState(false);

  const reqType = [
    { value: '1', label: '대내' },
    { value: '2', label: '대외' },
  ];

  const reqHeadcount = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  const reqPurp = [
    { value: '구축', label: '구축' },
    { value: '운영', label: '운영' },
    { value: '개선/개발', label: '개선/개발' },
  ];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
        <h2>정규/BP 인력 요청</h2>
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
              <div className={styles.item}>
                <span>등급</span>
                <input type="text" placeholder="ex. CJ PAY Back-End 개발 or CJ ENM 차세대 K-POP 플랫폼 구축" />
              </div>
              <div className={styles.item_half}>
                <label>대내외 구분</label>
                <SelectBox options={reqType} name="reqType" />
              </div>
              <div className={styles.item_half}>
                <label>인원</label>
                <SelectBox options={reqHeadcount} name="reqHeadcount" />
              </div>
              <div className={styles.item}>
                <label>목적</label>
                <SelectBox options={reqPurp} name="reqPurp" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

