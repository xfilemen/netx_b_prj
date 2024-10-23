"use client";

import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/locale';
import styles from '../styles/request.module.css';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/datepicker-custom.css';
import SelectBox from '../components/select';
import CheckBox from '../components/checkbox';
import Image from 'next/image';

export default function RegPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHeadcount, setSelectedHeadcount] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState([true]); // details 아코디언 상태 배열로 관리
  const [jobSelections, setJobSelections] = useState([]); // 각 아코디언의 2차 직무 선택 상태를 저장
  const [checkedItems, setCheckedItems] = useState([]); // 각 아코디언의 체크박스 상태 배열로 관리
  const [startDates, setStartDates] = useState([]); // 시작일 상태 배열
  const [lastDates, setLastDates] = useState([]);   // 종료일 상태 배열

  // 대내외 구분
  const reqType = [
    { value: '1', label: '대내' },
    { value: '2', label: '대외' },
  ];

  // 인원
  const reqHeadcount = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  // 목적
  const reqPurp = [
    { value: '구축', label: '구축' },
    { value: '운영', label: '운영' },
    { value: '개선/개발', label: '개선/개발' },
  ];

  // 직무 구분 데이터
  const jobData = {
    categories: [
      { value: 'dev', label: '개발', jobs: [{ value: '1', label: '웹 개발자' },{ value: '2', label: '서버 개발자' },{ value: '3', label: '프론트엔드 개발자' },{ value: '4', label: '안드로이드 개발자' },{ value: '5', label: 'C, C++ 개발자' },{ value: '6', label: 'IOS 개발자' },{ value: '7', label: '시스템, 네트워크 관리자' },{ value: '8', label: '개발 매니저' },{ value: '9', label: '기술지원' },{ value: '10', label: '보안 엔지니어' },{ value: '11', label: '프로덕트 매니저' },{ value: '12', label: 'PHP 개발자' },{ value: '13', label: '웹 퍼블리셔' },{ value: '14', label: '.Net 개발자' },{ value: '15', label: 'DBA' }] },
      { value: 'plan', label: '기획', jobs: [{ value: '1', label: '서비스 기획자' },{ value: '2', label: 'PM/PO' }] },
      { value: 'design', label: '디자인', jobs: [{ value: '1', label: 'UX디자이너' },{ value: '2', label: '웹 디자이너' }] }
    ]
  };

  // 유형 (정규직, BP, 기타)
  const typeChk = [
    { label: '정규직', name: '1' },
    { label: 'BP', name: '2' },
    { label: '기타', name: '3' },
  ];

  // 등급 (정규직, BP, 기타)
  const classChk = [
    { label: '초급', name: '4' },
    { label: '중급', name: '5' },
    { label: '고급', name: '6' },
    { label: '특급', name: '7' },
    { label: '기타', name: '8' },
  ];

  const deploymentTime =[
    { value: 'mm', label: 'm/m' },
    { value: 'md', label: 'm/d' },
    { value: 'mh', label: 'm/h' },
  ]

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleHeadcountChange = (e) => {
    const count = Number(e.target.value);
    setSelectedHeadcount(count);

    // detailsOpen 상태 업데이트
    setDetailsOpen((prev = []) => {
      const newLength = count - prev.length;
      return newLength > 0 ? [...prev, ...Array(newLength).fill(false)] : prev;
    });

    // startDates 상태 배열 크기 조정
    setStartDates((prev = []) => {
      const newLength = count - prev.length;
      return newLength > 0 ? [...prev, ...Array(newLength).fill(null)] : prev;
    });

    // lastDates 상태 배열 크기 조정
    setLastDates((prev = []) => {
      const newLength = count - prev.length;
      return newLength > 0 ? [...prev, ...Array(newLength).fill(null)] : prev;
    });
  };

  const toggleDetailsAccordion = (index) => {
    const updatedDetailsOpen = [...detailsOpen];
    updatedDetailsOpen[index] = !updatedDetailsOpen[index];
    setDetailsOpen(updatedDetailsOpen);
  };

  const handleJobCategoryChange = (index) => (e) => {
    const selectedCategory = e.target.value;
    const categoryData = jobData.categories.find(category => category.value === selectedCategory);
    const jobs = categoryData ? categoryData.jobs : [];
    const updatedJobSelections = [...jobSelections];
    updatedJobSelections[index] = { category: selectedCategory, jobs };
    setJobSelections(updatedJobSelections);
  };

  const handleJobSelectionChange = (index) => (e) => {
    const updatedJobSelections = [...jobSelections];
    updatedJobSelections[index].selectedJob = e.target.value;
    setJobSelections(updatedJobSelections);
  };

  const handleCheckboxChange = (index, item) => (e) => {
    const { name, checked } = e.target;
    const updatedCheckedItems = [...checkedItems];
    if (!updatedCheckedItems[index]) {
      updatedCheckedItems[index] = {}; // 새 객체 생성
    }
    updatedCheckedItems[index] = {
      ...updatedCheckedItems[index],
      [name]: checked,
    };
    setCheckedItems(updatedCheckedItems);
  };

  // 시작일을 개별적으로 설정하는 함수
  const handleStartDateChange = (index) => (date) => {
    const updatedStartDates = [...startDates];
    updatedStartDates[index] = date;
    setStartDates(updatedStartDates);
  };

  // 종료일을 개별적으로 설정하는 함수
  const handleLastDateChange = (index) => (date) => {
    const updatedLastDates = [...lastDates];
    updatedLastDates[index] = date;
    setLastDates(updatedLastDates);
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
                <span className={styles.tx}>등급</span>
                <input type="text" placeholder="ex. CJ PAY Back-End 개발 or CJ ENM 차세대 K-POP 플랫폼 구축" className={styles.txt}/>
              </div>
              <div className={styles.item_half}>
                <label>대내외 구분</label>
                <SelectBox options={reqType} name="reqType" />
              </div>
              <div className={styles.item_half}>
                <label>인원</label>
                <select name="reqHeadcount" onChange={handleHeadcountChange} className={styles.custom_select}>
                  {reqHeadcount.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.item}>
                <label>목적</label>
                <SelectBox options={reqPurp} name="reqPurp" />
              </div>
            </div>
          )}
        </div>
        {Array.from({ length: selectedHeadcount }, (_, index) => {
          const isDetailOpen = detailsOpen[index] || false;
          const checkState = checkedItems[index] || {};
          return (
            <div key={index} className={styles.accordion}>
              <div className={styles.title} onClick={() => toggleDetailsAccordion(index)}>
                <h3>
                  <Image
                    src="/images/main/ico_reg.png"
                    alt="요청 기본 정보"
                    width={46}
                    height={46}
                  />
                  요청 상세 정보 <span className={styles.acc_num}>{index + 1}</span>
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
                  <div className={styles.item}>
                    <label>직무 구분</label>
                    <SelectBox
                      options={jobData.categories}
                      name={`reqCategory-${index}`}
                      onChange={handleJobCategoryChange(index)}
                    />
                    <span className={styles.blt}>&gt;</span> 
                    <SelectBox
                      options={jobSelections[index]?.jobs || []}
                      name={`reqJob-${index}`}
                      onChange={handleJobSelectionChange(index)}
                    />
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>유형</span>
                    {typeChk.map((item) => (
                      <CheckBox
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        checked={checkState[item.name]}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>등급</span>
                    {classChk.map((item) => (
                      <CheckBox
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        checked={checkState[item.name]}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </div>
                  <div className={styles.item_half}>
                    <span className={styles.tx}>투입 예정일</span>
                    <DatePicker 
                      dateFormat='yyyy.MM.dd'
                      locale={ko}
                      placeholderText="시작일"
                      selected={startDates[index]}
                      className={styles.calendar}
                      onChange={handleStartDateChange(index)}
                    />
                  </div>
                  <div className={styles.item_half}>
                    <span className={styles.tx}>투입 종료일</span>
                    <DatePicker
                      dateFormat='yyyy.MM.dd'
                      locale={ko}
                      placeholderText="종료일"
                      selected={lastDates[index]}
                      className={styles.calendar}
                      onChange={handleLastDateChange(index)}
                    />
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>투입 공수</span>
                    <SelectBox options={deploymentTime} name="deploymentTime" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}