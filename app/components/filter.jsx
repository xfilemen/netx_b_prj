import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { it, ko } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import '@styles/datepicker-custom.css';
import CheckBox from '@components/checkbox';
import styles from '@styles/detail.module.css';
import Image from "next/image";

export default function FilterPage({onClose}) {
  const [checkedValues, setCheckedValues] = useState([]);
  const stateChk = [
      { label: '전체', name: '1', id: 'all' },
      { label: '접수', name: '2', id: 'register' },
      { label: '진행', name: '3', id: 'progress' },
      { label: '취소', name: '4', id: 'cancel' },
      { label: '반려', name: '5', id: 'return' },
      { label: '완료', name: '6', id: 'complete' },
  ];
  const typeChk = [
    { label: '전체 ', name: '7', id: 'typeall' },
    { label: '정규', name: '8', id: 'regular' },
    { label: 'BP', name: '9', id: 'BP' },
];
  const handleCheckboxChange = (label) => {
    setCheckedValues((prevState) => {
      if (prevState.includes(label)) {
        // 체크박스 해제 시 해당 값을 제거
        return prevState.filter((item) => item !== label);
      } else {
        // 체크박스 체크 시 해당 값을 추가
        return [...prevState, label];
      }
    });
  };
  return (
    <div className={styles.pop_content}>
        <div className={styles.header}>
            Filter
            <a onClick={onClose}>
                <Image
                src="/images/detail/ico_black_close.png"
                alt="닫기"
                width={24}
                height={24}
                />
            </a>
        </div>
        <div className={styles.content}>
            <div className={styles.item}>
                <p className={styles.tx}>진행상태</p>
                <div className={styles.chk_area}>
                    {stateChk.map((item) => (
                      <CheckBox
                        key={item.name}
                        label={item.label}
                        id={item.id}
                        name="reqType"
                        checked={checkedValues.includes(item.label)} // 체크 상태
                        onChange={() => handleCheckboxChange(item.label)} // 상태 업데이트
                      />
                    ))}
                </div>
            </div>
            <div className={styles.item}>
                <p className={styles.tx}>유형</p>
                <div className={styles.chk_area}>
                    {typeChk.map((item) => (
                      <CheckBox
                        key={item.name}
                        label={item.label}
                        id={item.id}
                        name="reqType"
                        checked={checkedValues.includes(item.label)} // 체크 상태
                        onChange={() => handleCheckboxChange(item.label)} // 상태 업데이트
                      />
                    ))}
                </div>
            </div>
            <div className={styles.item}>
                <p className={styles.tx}>기간 <span>요청일 기준</span></p>
                <div className={styles.item_half}>
                    <DatePicker 
                      dateFormat='yyyy-MM-dd'
                      locale={ko}
                      placeholderText="시작일"
                      className={styles.calendar}
                      name="reqInDt"
                    />
                    <span className={styles.dash_line}>-</span> 
                    <DatePicker
                      dateFormat='yyyy-MM-dd'
                      locale={ko}
                      placeholderText="종료일"
                      className={styles.calendar}
                      name="reqOutDt"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}