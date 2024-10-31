"use client";

import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { it, ko } from 'date-fns/locale';
import styles from '../styles/request.module.css';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/datepicker-custom.css';
import SelectBox from '../components/select';
import CheckBox from '../components/checkbox';
import Image from 'next/image';
import apiHandler from '../../utils/api-handler';

export default function RegPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHeadcount, setSelectedHeadcount] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState([true]); // details 아코디언 상태 배열로 관리
  const [jobSelections, setJobSelections] = useState([]); // 각 아코디언의 2차 직무 선택 상태를 저장
  const [checkedItems, setCheckedItems] = useState([]); // 각 아코디언의 체크박스 상태 배열로 관리
  const [startDates, setStartDates] = useState([]); // 시작일 상태 배열
  const [lastDates, setLastDates] = useState([]);   // 종료일 상태 배열

  const [reqTypeChk, setReqTypeChk] = useState([]);   // 유형 배열

  // 대내외 구분
  const reqType = [
    { value: '1', label: '대내' },
    { value: '2', label: '대외' },
  ];

  // 인원
  const reqHeadcount = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  // 목적
  const reqPurp = [
    { value: '1', label: '구축' },
    { value: '2', label: '운영' },
    { value: '3', label: '개선/개발' },
  ];

  // 직무 구분 데이터
  const jobData = {
    categories: [
      { value: 'dev', label: '개발', jobs: [{ value: '웹 개발자', label: '웹 개발자' },{ value: '서버 개발자', label: '서버 개발자' },{ value: '프론트엔드 개발자', label: '프론트엔드 개발자' },{ value: '안드로이드 개발자', label: '안드로이드 개발자' },{ value: 'C, C++ 개발자', label: 'C, C++ 개발자' },{ value: 'IOS 개발자', label: 'IOS 개발자' },{ value: '시스템, 네트워크 관리자', label: '시스템, 네트워크 관리자' },{ value: '개발 매니저', label: '개발 매니저' },{ value: '기술지원', label: '기술지원' },{ value: '보안 엔지니어', label: '보안 엔지니어' },{ value: '프로덕트 매니저', label: '프로덕트 매니저' },{ value: 'PHP 개발자', label: 'PHP 개발자' },{ value: '웹 퍼블리셔', label: '웹 퍼블리셔' },{ value: '.Net 개발자', label: '.Net 개발자' },{ value: 'DBA', label: 'DBA' }] },
      { value: 'plan', label: '기획', jobs: [{ value: '서비스 기획자', label: '서비스 기획자' },{ value: 'PM/PO', label: 'PM/PO' }] },
      { value: 'design', label: '디자인', jobs: [{ value: 'UX디자이너', label: 'UX디자이너' },{ value: '웹 디자이너', label: '웹 디자이너' }] }
    ]
  };

  // 유형 (정규직, BP, 기타)
  const typeChk = [
    { label: '정규직', name: '1' },
    { label: 'BP', name: '2' },
    { label: '기타', name: '3' },
  ];

  const deploymentTime = [
    { value: 'mm', label: 'm/m' },
    { value: 'md', label: 'm/d' },
    { value: 'mh', label: 'm/h' },
  ]

  const endTimeChk = [
    { label: '미정', name: 'N' },
  ]

  const workplace = [
    { label: '미정', name: 'N' },
  ]

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  // 여러 입력 필드 값을 관리할 상태 선언 (기본 요청)
  const [formData, setFormData] = useState({
    reqId: 17,
    reqTitle : '',
    reqName : '',
    reqOrd : 'Medium',
    reqStatus : 'register',
    reqType : '',
    reqHeadcount : 0,
    reqPurp : '',
    reqDet : [{}]
  });

  // 초기 배열 생성 함수
  const createDetailData = (count) => Array.from(
    { length: count },
    () => ({
      reqId:'',
      reqJob: '',
      reqGrade: '',
      reqInDt: '',
      reqOutDt: '',
      reqMm: '',
      reqLoc: '',
      reqSkill: '',
      reqJob: '',
      // reqJobDet: '',
      // 필요한 다른 필드들도 추가하세요
    })
  );

  // 상태 설정
  const [detFormData, setDetFormData] = useState(createDetailData(selectedHeadcount));

  const API_URL1 = '/api/req/regist'; // API 경로를 상수로 관리
  const API_URL2 = '/api/req/regist/detail';
  const GET_SEQ_URL1 = '/api/req/getReqSeq';
  const GET_SEQ_URL2 = '/api/req/getDetReqSeq';

  // 데이터 저장
  const insertData = async () => {
    try {
      console.log('📢 [page.jsx:81] insertData:: ', API_URL1);

      // 시퀀스 조회
      const seq = await apiHandler.postData(GET_SEQ_URL1);
      console.log('📢 [page.jsx:105]', seq.data);
      formData.reqId = parseInt(seq.data);

      // POST 요청에서 formData 전체 객체를 전달 (객체 단축 속성 사용)
      const result = await apiHandler.postData(API_URL1, { ...formData });

      for (let index = 0; index < detFormData.length; index++) {
        detFormData[index].reqId = parseInt(seq.data);
        const seq2 = await apiHandler.postData(GET_SEQ_URL2);
        detFormData[index].reqDetId = parseInt(seq2.data);
        await apiHandler.postData(API_URL2, { ...detFormData[index] })
      }

      console.log('📢 [page.jsx:95]', result);
      
    } catch (error) {
      console.error('❌ [page.jsx:100] Error inserting data:', error);
    }
  };

  const handleHeadcountChange = (e) => {
    const count = Number(e.target.value);
    setSelectedHeadcount(count);

    handleChange(e);

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

  // 상세 입력 값이 변경될 때
  const handleDetChange = (index) => (event) => {
    console.log('📢 [page.jsx:190]', selectedHeadcount);
    let { value, name, type } = event.target;
    if (type === "number") {
      value = parseInt(value);
    }
    console.log('📢 [page.jsx:189]', type);
    console.log('📢 [page.jsx:193]', value);
    console.log('📢 [page.jsx:194]', name);
    console.log('📢 [page.jsx:195]', index);
    console.log('📢 [page.jsx:195]', detFormData);
    setDetFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
    console.log('📢 [page.jsx:189]', detFormData);
  };

  // 상세 입력 값이 변경될 때
  const handleDetChkChange = (index, value1) => (event) => {
    console.log('📢 [page.jsx:190]', selectedHeadcount);
    let { value, name } = event.target;
    console.log('📢 [page.jsx:196]', value1);
    console.log('📢 [page.jsx:193]', value);
    console.log('📢 [page.jsx:194]', name);
    console.log('📢 [page.jsx:195]', index);
    console.log('📢 [page.jsx:195]', detFormData);
    if(name == 'req_mm') {
      value = parseInt(value);
    }
    setDetFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
    console.log('📢 [page.jsx:189]', detFormData);
  };
  
  const handleJobSelectionChange = (index) => (event) => {
    const { name, value } = event.target;
    console.log('📢 [page.jsx:208]', name);
    console.log('📢 [page.jsx:209]', index+1);
    const updatedJobSelections = [...jobSelections];
    updatedJobSelections[index].selectedJob = event.target.value;
    handleDetChange(index)(event);
    console.log('📢 [page.jsx:195]');
    setJobSelections(updatedJobSelections);
    
  };

  // 입력 값이 변경될 때 상태 업데이트
  const handleChange = (event) => {
    let { name, value } = event.target;  // 입력 필드의 이름(name)과 값(value)을 가져옴
    console.log('📢 [page.jsx:173]', typeof value);

    if (name == "reqHeadcount") {
      value = parseInt(value);
    }

    console.log('📢 [page.jsx:173]', typeof value);

    setFormData({
      ...formData,  // 기존 상태를 복사하고
      [name]: value // name 속성에 해당하는 값을 업데이트
    });
    console.log('📢 [page.jsx:173]', value);
    console.log('📢 [page.jsx:174]', formData);
  };

  const handleCheckboxChange1 = (index) => (e) => {
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
    handleDetChange(index)(e);
  };

  const handleCheckboxChange99 = (index, item, z) => (e) => {
    console.log('📢 [page.jsx:238]', index, item, z);
    console.log('📢 [page.jsx:239]', e.target.name);
    const {name} = e.target;
    console.log('📢 [page.jsx:241]', name);
    if (detFormData[index].name == undefined) {
      console.log('📢 [page.jsx:243]', item.label);
      console.log('📢 [page.jsx:244]', e.target.value);
    } else {
      handleDetChkChange
    }
  };

  const [reqGradeChk, setReqGradeChk] = useState([]); // 초기 상태는 빈 배열

  const handleCheckboxChange = (index, item) => (e) => {
    console.log('📢 [page.jsx:268]', index);
    console.log('📢 [page.jsx:269]', item.label);
    console.log('📢 [page.jsx:270]', e.target);
    console.log('📢 [page.jsx:271]', e.target.checked);
    setReqTypeChk([]);
    console.log('📢 [page.jsx:280]', reqTypeChk);
    setReqTypeChk(detFormData[index].req_type);
    console.log('📢 [page.jsx:281]', detFormData[index].req_type);
    console.log('📢 [page.jsx:28199]', reqTypeChk);

    if(e.target.checked) {
      addItem(item.label, e.target.name, index);
      console.log('📢 [page.jsx:282]', );
    } else {
      removeItem(item.label, e.target.name, index);
    }

    console.log('📢 [page.jsx:276]', reqTypeChk);
    console.log('📢 [page.jsx:283]', reqGradeChk);

    setDetFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [e.target.name]: reqTypeChk } : item
      )
    );
    console.log('📢 [page.jsx:295]', detFormData);
  };

  // 체크박스 선택시 데이터 추가
  const addItem = (newItem, name, index) => {
    console.log('📢 [page.jsx:282]', newItem);
    console.log('📢 [page.jsx:288]', name);
    console.log('📢 [page.jsx:293]', index);
    if (name === "req_type") {
      setReqTypeChk((prevItems) => {
        if (!Array.isArray(prevItems)) {
          // console.error('prevItems is not an array', prevItems);
          return [newItem]; // prevItems가 배열이 아닌 경우 새 배열 생성
        }
        return [...prevItems, newItem]; // 기존 배열에 새 항목 추가
      });
    } else {
      setReqGradeChk((prevItems) => {
        if (!Array.isArray(prevItems)) {
          // console.error('prevItems is not an array', prevItems);
          return [newItem]; // prevItems가 배열이 아닌 경우 새 배열 생성
        }
        return [...prevItems, newItem]; // 기존 배열에 새 항목 추가
      });
    }
  };

  // 체크박스 선택시 데이터 추가
  const addItem2 = (newItem, name, index) => {
    console.log('📢 [page.jsx:282]', newItem);
    console.log('📢 [page.jsx:288]', name);
    console.log('📢 [page.jsx:293]', index);
    if (name === "req_type") {
      setReqTypeChk((prevItems) => {
        if (!Array.isArray(prevItems)) {
          console.error('prevItems is not an array', prevItems);
          return [newItem]; // prevItems가 배열이 아닌 경우 새 배열 생성
        }
        return [...prevItems, newItem]; // 기존 배열에 새 항목 추가
      });
    } else {
      setReqGradeChk((prevItems) => {
        if (!Array.isArray(prevItems)) {
          console.error('prevItems is not an array', prevItems);
          return [newItem]; // prevItems가 배열이 아닌 경우 새 배열 생성
        }
        return [...prevItems, newItem]; // 기존 배열에 새 항목 추가
      });
    }
  };

  // 체크박스 해제시 데이터 삭제
  const removeItem = (itemToRemove, name) => {
    console.log('📢 [page.jsx:297]', itemToRemove);
    console.log('📢 [page.jsx:299]', name);
    if (name === "req_type") {
      setReqTypeChk((prevItems) => {
        // 항목이 존재하는지 확인
        if (prevItems.includes(itemToRemove)) {
          // 항목을 제외한 새로운 배열 반환
          return prevItems.filter(item => item !== itemToRemove);
        }
        return prevItems; // 항목이 존재하지 않으면 변경하지 않음
      });
    } else {
      setReqGradeChk((prevItems) => {
        // 항목이 존재하는지 확인
        if (prevItems.includes(itemToRemove)) {
          // 항목을 제외한 새로운 배열 반환
          return prevItems.filter(item => item !== itemToRemove);
        }
        return prevItems; // 항목이 존재하지 않으면 변경하지 않음
      });
    }
    
  };

  // 시작일을 개별적으로 설정하는 함수
  const handleStartDateChange = (index) => (date) => {
    const updatedStartDates = [...startDates];
    console.log('📢 [page.jsx:370]', date);
    const newDate = formatDate(date);
    console.log('📢 [page.jsx:372]', newDate);
    updatedStartDates[index] = newDate;
    setStartDates(updatedStartDates);
    console.log('📢 [page.jsx:372]', startDates[index]);
    setDetFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, ["reqInDt"]: newDate } : item
      )
    );
    console.log('📢 [page.jsx:189]', detFormData);
  };

  // 종료일을 개별적으로 설정하는 함수
  const handleLastDateChange = (index) => (date) => {
    const updatedLastDates = [...lastDates];
    console.log('📢 [page.jsx:370]', date);
    const newDate = formatDate(date);
    console.log('📢 [page.jsx:372]', newDate);
    updatedLastDates[index] = newDate;
    setLastDates(updatedLastDates);
    setDetFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, ["reqOutDt"]: newDate } : item
      )
    );
    console.log('📢 [page.jsx:189]', detFormData);
  };

  const formatDate = (date) => {
    const newDate = new Date(date).toISOString(); // "YYYY-MM-DDTHH:MM:SSZ" 형식으로 변환
  
    // return `${year}-${month}-${day}`; // 형식: yyyy-mm-dd
    
    // const formattedDate = newDate.toLocaleDateString('sv-SE'); // "YYYY-MM-DD" 형식으로 변환
    return newDate;
  }

  const goMian = () => {
    location.href = '/main'
  }

  useEffect(() => {
    setDetFormData((prevData) => {
      if (selectedHeadcount > prevData.length) {
        // 새로운 객체를 추가하는 경우
        return [
          ...prevData,
          ...Array.from({ length: selectedHeadcount - prevData.length }, () => ({
            reqId: '',
            reqJob: '',
            reqType: '',
            // 필요한 다른 필드들도 추가
          })),
        ];
      } else if (selectedHeadcount < prevData.length) {
        // 기존 배열의 길이를 줄이는 경우
        return prevData.slice(0, selectedHeadcount);
      }
      return prevData; // 변화가 없을 때는 이전 데이터 그대로 반환
    });
  }, [selectedHeadcount]);

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
        <h2>인력 요청</h2>
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
                <span className={styles.tx}>요청명</span>
                <input type="text" placeholder="ex. CJ PAY Back-End 개발 or CJ ENM 차세대 K-POP 플랫폼 구축" 
                className={styles.txt} name="reqTitle" value={formData.reqTitle} onChange={handleChange}/>
              </div>
              <div className={styles.item_half}>
                <label>대내외 구분</label>
                <SelectBox options={reqType} name="reqType" onChange={handleChange}/>
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
                <SelectBox options={reqPurp} name="reqPurp" onChange={handleHeadcountChange}/>
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
                      name="reqJob"
                      onChange={handleJobSelectionChange(index)}
                    />
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>유형</span>
                    {typeChk.map((item) => (
                      <CheckBox
                        key={item.name}
                        label={item.label}
                        name="reqType"
                        checked={checkState[item.name]}
                        onChange={handleCheckboxChange(index,item)}
                      />
                    ))}
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>등급</span>
                    <input type="text" placeholder="ex. 초초/초중/초상" className={`${styles.txt} ${styles.w_txt}`} name='reqGrade' onChange={handleDetChange(index)}/>
                  </div>
                  <div className={styles.item_half}>
                    <span className={styles.tx}>투입 예정일</span>
                    <DatePicker 
                      dateFormat='yyyy.MM.dd'
                      locale={ko}
                      placeholderText="시작일"
                      selected={startDates[index]}
                      className={styles.calendar}
                      name="reqInDt"
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
                    <span className={styles.end_chk}>
                      {endTimeChk.map((item) => (
                        <CheckBox
                          key={item.name}
                          label={item.label}
                          name={item.name}
                          checked={checkState[item.name]}
                          onChange={handleCheckboxChange}
                        />
                      ))}
                    </span>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>투입 공수</span>
                    <input type="number" placeholder="ex. 1 or 0.5" className={styles.mm_tx} name='reqMm' onChange={handleDetChange(index)}/>
                    <span className={styles.tx}>M/M</span>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>근무지</span>
                    <input type="text" placeholder="ex. 지역명 + 빌딩명 or 본사명" className={`${styles.txt} ${styles.w_txt}` } name="reqLoc" onChange={handleDetChange(index)}/>
                    {workplace.map((item) => (
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
                    <span className={`${styles.tx} ${styles.v_t}`}>필수<br />요구기술</span>
                    <textarea name="" placeholder="요구 스킬 기재" className={styles.text_box}></textarea>
                  </div>
                  <div className={styles.item}>
                    <span className={`${styles.tx} ${styles.v_t}`}>우대<br />요구기술</span>
                    <textarea name="" placeholder="요구 스킬 기재" className={styles.text_box}></textarea>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.btn_section}>
        <button className={styles.cancel_btn} onClick={goMian}>취소</button>
        <button className={styles.aply_btn} onClick={insertData}>등록</button>
      </div>
    </div>
  );
}