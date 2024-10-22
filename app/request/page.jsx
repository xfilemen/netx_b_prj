"use client";

import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import styles from '../styles/request.module.css';
import "react-datepicker/dist/react-datepicker.css";
import SelectBox from '../components/select';
import CheckBox from '../components/checkbox';
import Image from 'next/image';

export default function RegPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHeadcount, setSelectedHeadcount] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState([true]); // details 아코디언 상태 배열로 관리
  const [selectedCategory, setSelectedCategory] = useState(''); // 1차 직무 선택 상태
  const [selectedJobs, setSelectedJobs] = useState([]); // 2차 직무 상태
  const [jobSelections, setJobSelections] = useState([]); // 각 아코디언의 2차 직무 선택 상태를 저장
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    option1: false,
    option2: false,
    option3: false,
  });
  const [startDate, setStartDate] = useState(new Date());

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
    { label: '초급', name: '1' },
    { label: '중급', name: '2' },
    { label: '고급', name: '3' },
    { label: '특급', name: '4' },
    { label: '기타', name: '5' },
  ];


  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleHeadcountChange = (e) => {
    setSelectedHeadcount(Number(e.target.value)); // 선택된 숫자로 상태 업데이트
  };

  const toggleDetailsAccordion = (index) => {
    const updatedDetailsOpen = [...detailsOpen];
    updatedDetailsOpen[index] = !updatedDetailsOpen[index];
    setDetailsOpen(updatedDetailsOpen);
  };

   // 1차 직무 선택 시 2차 직무 데이터 설정
  const handleJobCategoryChange = (index) => (e) => {
    const selectedCategory = e.target.value;
    const categoryData = jobData.categories.find(category => category.value === selectedCategory);
    setSelectedCategory(selectedCategory);
    const jobs = categoryData ? categoryData.jobs : [];
    const updatedJobSelections = [...jobSelections];
    updatedJobSelections[index] = { category: selectedCategory, jobs }; // 각 아코디언의 1차 직무 선택 상태 저장
    setJobSelections(updatedJobSelections);
  };

  // 2차 직무 선택 처리
  const handleJobSelectionChange = (index) => (e) => {
    const updatedJobSelections = [...jobSelections];
    updatedJobSelections[index].selectedJob = e.target.value; // 선택된 2차 직무 저장
    setJobSelections(updatedJobSelections);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
          const isDetailOpen = detailsOpen[index] || false; // index로 상태 접근
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
                        checked={checkedItems[item.name]}
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
                        checked={checkedItems[item.name]}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </div>
                  <div className={styles.item_half}>
                    <span className={styles.tx}>투입 예정일</span>
                    <DatePicker dateFormat='yyyy.MM.dd' placeholderText="시작일" selected={startDate} onChange={(date) => setStartDate(date)} />
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