"use client";

import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { it, ko } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import '@styles/datepicker-custom.css'; 
import styles from '@styles/request.module.css';
import SelectBox from '@components/select';
import CheckBox from '@components/checkbox';
import Image from 'next/image';
import apiCall from '../../utils/api-call';

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
    { value: '4', label: '기타' },
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
  ];

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
    reqHeadcount : 1,
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
      reqInDt: null,
      reqOutDt: null,
      reqMm: '',
      reqLoc: '',
      reqSkill: '',
      reqJob: '',
      reqOutDtNull: false,
      reqLocNull: false,
      reqJobCategory: '',
      reqPrefSkill: '',
      reqQualSkill: '',
      // reqJobDet: '',
      // 필요한 다른 필드들도 추가하세요
    })
  );

  // 상태 설정
  const [detFormData, setDetFormData] = useState(createDetailData(selectedHeadcount));
  const [data, setData] = useState([]);

  const API_URL1 = '/api/req/regist'; // API 경로를 상수로 관리
  const GET_SEQ_URL1 = '/api/req/getReqSeq';

  // 데이터 저장
  const insertData = async () => {

    // 유효성 체크 로직
    console.log('📢 [page.jsx:126]formData :: ', formData);
    if (formData.reqTitle.trim() == '') {
      alert('업무명을 입력하지 않았습니다.')
      return true;
    } else if (formData.reqType.trim() == '') {
      alert('대내/외 구분을 선택하지 않았습니다.')
      return true;
    } else if (formData.reqPurp.trim() == '') {
      alert('목적을 선택하지 않았습니다.')
      return true;
    }

    try {
      console.log('📢 [page.jsx:81] insertData:: ', API_URL1);

      // 시퀀스 조회
      const seq = await apiCall.postData(GET_SEQ_URL1);
      console.log('📢 [page.jsx:105]', seq.data);
      formData.reqId = parseInt(seq.data);
      detFormData.reqType = [...checkState];
      
      console.log('📢 [page.jsx:130]', formData.reqDet);
      // POST 요청에서 formData 전체 객체를 전달 (객체 단축 속성 사용)
      for (let index = 0; index < detFormData.length; index++) {

        console.log('📢 [page.jsx:132]', checkState[index]);
        const getTrueKeysAsString = (obj) => {
          if (obj && typeof obj === 'object') {
              return Object.keys(obj)
                  .filter(key => obj[key])
                  .join(', ');
          }
          return '';
        };
        const trueKeysString = getTrueKeysAsString(checkState[index]);
        console.log('📢 [page.jsx:133]', trueKeysString);

        // 유효성 체크 로직
        console.log('📢 [page.jsx:126]detFormData[index]:: ', detFormData[index]);
        const checkNum = "상세 정보 " + (index + 1);
        if (detFormData[index].reqJob.trim() == '') {
          alert((checkNum) + '번째 직무 구분이 입력되지 않았습니다.');
          return true;
        } else if (trueKeysString.trim() == '') {
          alert((checkNum) + '번째 유형을 체크하지 않았습니다.');
          return true;
        } else if (detFormData[index].reqGrade.trim() == '') {
          alert((checkNum) + '번째 등급을 입력하지 않았습니다.');
          return true;
        } else if (detFormData[index].reqInDt == '' || detFormData[index].reqInDt == null) {
          alert((checkNum) + '번째 투입 예정일을 입력하지 않았습니다.');
          return true;
        } else if ((detFormData[index].reqOutDt != null) && detFormData[index].reqMm == '') {
          console.log('📢 [page.jsx:167]', detFormData[index].reqOutDt);
          console.log('📢 [page.jsx:167]', detFormData[index].reqOutDt != '');
            alert((checkNum) + '번째 투입 공수를 입력하지 않았습니다.');
            return true;
        } else if (detFormData[index].reqSkill.trim() == '') {
          alert((checkNum) + '번째 자격요건을 입력하지 않았습니다.');
          return true;
        } else if (detFormData[index].reqQualSkill.trim() == '') {
          alert((checkNum) + '번째 기술을 입력하지 않았습니다.');
          return true;
        }

        detFormData[index].reqType = trueKeysString;
        detFormData[index].reqId= parseInt(seq.data);
      }
      console.log('📢 체크 확인: ',formData.reqDet);
      formData.reqDet = [...detFormData];
      formData.reqName = formData.reqTitle;
      
      console.log('📢 [page.jsx:151]', data);
      const result = await apiCall.postData(API_URL1, { data: formData });

      console.log('📢 [page.jsx:95]', result);

      // 완료 화면으로 이동
      location.href = '/request/complete';
      
    } catch (error) {
      console.error('❌ [page.jsx:100] Error inserting data:', error);
    }
  };

  const handleHeadcountChange = (e) => {
    const count = Number(e.target.value);
    setSelectedHeadcount(count);

    formData.reqHeadcount = count;

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
    detFormData[index].reqJobCategory = selectedCategory;
  };

  // 상세 입력 값이 변경될 때
  const handleDetChange = (index) => (event) => {
    console.log('📢 [page.jsx:190]', selectedHeadcount);
    let { value, name, type } = event.target;
    if (type === "number") {
      value = parseInt(value);
    }

    console.log('📢 [page.jsx:259]', value.length);
    // 유효성 체크 로직
    if (name == 'reqSkill' && value.length > 500) {
      alert("최대 500자까지 입력 가능합니다.");
      return true;
    } else if (name == 'reqPrefSkill' && value.length > 500) {
      alert("최대 500자까지 입력 가능합니다.");
      return true;
    }

    if (name == "reqLoc"){
      setDetFormData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, ["reqLocNull"]: false, [name]: value } : item
        )
      );
    } else {
      setDetFormData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    
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
    console.log('📢 [page.jsx:250]', value.length);
    // 유효성 체크 로직
    if (name == 'reqTitle' && value.length > 40) {
      alert("최대 40자 까지 입력 가능합니다.");
      return true;
    }

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

  const [checkNullState, setCheckNullState] = useState([]);
  const [checkState, setCheckState] = useState([]);
  // 체크박스 상태 변경 함수
  const handleCheckboxChange = (name, index) => (event) => {
    console.log('📢 [page.jsx:251]', name);
    const { checked } = event.target;

    console.log('📢 [page.jsx:259]', checked);

    if(name == "reqLocNull" || name == "reqOutDtNull") {
      console.log('📢 [page.jsx:253]', name);
      detFormData[index][name] = "";
      console.log('📢 [page.jsx:255]');

     console.log('📢 [page.jsx:280]', checkNullState);

      setDetFormData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: checked, } : item
        )
      );
      console.log('📢 [page.jsx:285]', detFormData);
    }
  
    setCheckState((prevState) => {
      const updatedState = [...prevState];
      
      // 인덱스 위치에 데이터가 없을 경우 초기화
      if (!updatedState[index]) {
        updatedState[index] = {};
      }
  
      // 해당 인덱스의 name 값을 업데이트
      updatedState[index] = {
        ...updatedState[index],
        [name]: checked,
      };
      return updatedState;
    });

    console.log('📢 [page.jsx:318]', checkState);
  };

  // 미정 체크박스 상태 변경 함수
  const handleNullCheckboxChange = (name2, index) => (event) => {
    const { checked, name, value } = event.target;

    console.log('📢 [page.jsx:259]', checked);

    if(name2 == "reqLocNull" || name2 == "reqOutDtNull") {
      console.log('📢 [page.jsx:253]', name2);
      
      console.log('📢 [page.jsx:255]',name);

      setDetFormData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name2]: checked, [name]: '', } : item
        )
      );
      console.log('📢 [page.jsx:285]', detFormData);
    }
  };

  // 시작일을 개별적으로 설정하는 함수
  const handleStartDateChange = (index) => (date) => {
    const updatedStartDates = [...startDates];
    console.log('📢 [page.jsx:370]', date);
    const newDate = formatDate(date);
    console.log('📢 [page.jsx:372]', newDate);
    
    if (newDate > detFormData[index].reqOutDt) {
      alert("투입 예정일은 투입 종료일보다 이전이어야 합니다.");
      return true;
    }

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
    if (newDate < detFormData[index].reqInDt) {
      alert("투입 종료일은 투입 예정일보다 이후이어야 합니다.");
      return true;
    }
    updatedLastDates[index] = newDate;
    setLastDates(updatedLastDates);
    setDetFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, ["reqOutDt"]: newDate, ["reqOutDtNull"]: false, } : item
      )
    );

    // 투입공수 계산
    const {totalDays, workdaysOnly} = calculateDateDifference(detFormData[index].reqInDt, newDate);

    console.log(`총 날짜 차이 (주말 포함): ${totalDays}일`);
    console.log(`총 근무일 차이 (주말 제외): ${workdaysOnly}일`);

    if (totalDays >= 30) {
      detFormData[index].reqMm = Math.floor(totalDays / 30);
      console.log('📢 [page.jsx:372]totalDays / 30 ', (totalDays / 30));
    } else {
      detFormData[index].reqMm = 0;
    }
    console.log('📢 [page.jsx:417]', totalDays, workdaysOnly);
    console.log('📢 [page.jsx:189]', detFormData);
  };

  // 날짜계산 함수
  const calculateDateDifference = (startDate, endDate, includeWeekends = false) => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      throw new Error("유효하지 않은 날짜 형식입니다.");
    }

    if (start > end) {
      throw new Error("시작일은 종료일보다 이전이어야 합니다.");
    }

    // 시작일과 종료일이 동일할 경우 0 반환
    if (start.getTime() === end.getTime()) {
      return { totalDays: 0, workdaysOnly: 0 };
    }

    let totalDays = 0;
    let workdayCount = 0;

    let currentDate = new Date(start);

    totalDays / 30

    // 시작일과 종료일을 포함하여 하루씩 증가
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay(); // 0: 일요일, 6: 토요일

      // 주말을 포함하지 않는 경우 주말을 제외하고 계산
      if (includeWeekends || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
        workdayCount++;
      }

      totalDays++;
      currentDate.setDate(currentDate.getDate() + 1); // 하루씩 증가
    }

    return {
      totalDays: totalDays -1,
      workdaysOnly: workdayCount -1
    };
  };

  const formatCalcDate = (dateStr) => {
    console.log('📢 [page.jsx:454]', dateStr);
    return dateStr.replace(/-/g, '/'); // 'YYYY-MM-DD' -> 'YYYY/MM/DD' 형식으로 변환
  }

  const formatDate = (date) => {
    const year = date.getFullYear(); // 년도
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 1 더해줌)
    const day = String(date.getDate()).padStart(2, '0'); // 일
  
    return `${year}-${month}-${day}`; // 형식: yyyy-mm-dd
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
            reqOutDtNull: false,
            reqLocNull: false,
            reqLoc: '',
            reqSkill: '',
            reqMm: '',
            reqQualSkill: '',
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

  useEffect(() => {
    console.log('📢 [page.jsx:364]999', detFormData);
  }, [detFormData]);

  useEffect(() => {
    console.log('📢 [page.jsx:364]888', formData);

    // 업무명 유효성체크
    if (formData.reqName.length > 10) {

    }
  }, [formData]);

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
                alt="기본 정보"
                width={46}
                height={46}
              />
              기본 정보
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
                <span className={styles.tx}><span className={styles.essential_blt}>✓</span> 업무명</span>
                <input type="text" placeholder="ex. CJ PAY Back-End 개발 or CJ ENM 차세대 K-POP 플랫폼 구축" 
                className={styles.txt} name="reqTitle" value={formData.reqTitle} onChange={handleChange}/>
              </div>
              <div className={styles.item_half}>
                <label><span className={styles.essential_blt}>✓</span> 대내외 구분</label>
                <SelectBox options={reqType} name="reqType" onChange={handleChange}/>
              </div>
              <div className={styles.item_half}>
                <label><span className={styles.essential_blt}>✓</span> 인원</label>
                <select name="reqHeadcount" onChange={handleHeadcountChange} className={styles.custom_select}>
                  {reqHeadcount.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.item}>
                <label><span className={styles.essential_blt}>✓</span> 목적</label>
                <SelectBox options={reqPurp} name="reqPurp" onChange={handleChange}/>
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
                    alt="기본 정보"
                    width={46}
                    height={46}
                  />
                  상세 정보 <span className={styles.acc_num}>{index + 1}</span>
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
                    <label><span className={styles.essential_blt}>✓</span> 직무 구분</label>
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
                    <span className={styles.tx}><span className={styles.essential_blt}>✓</span> 유형</span>
                    {typeChk.map((item) => (
                      <CheckBox
                        key={item.name}
                        label={item.label}
                        name="reqType"
                        checked={checkState[item.name]}
                        onChange={handleCheckboxChange(item.label, index)}
                      />
                    ))}
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}><span className={styles.essential_blt}>✓</span> 등급</span>
                    <input type="text" placeholder="ex. 초초/초중/초상" className={`${styles.txt} ${styles.w_txt}`} name='reqGrade' onChange={handleDetChange(index)}/>
                  </div>
                  <div className={styles.item_half}>
                    <span className={styles.tx}><span className={styles.essential_blt}>✓</span> 투입 예정일</span>
                    <DatePicker 
                      dateFormat='yyyy-MM-dd'
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
                      dateFormat='yyyy-MM-dd'
                      locale={ko}
                      placeholderText="종료일"
                      selected={lastDates[index]}
                      className={styles.calendar}
                      name="reqOutDt"
                      value={detFormData[index].reqOutDt}
                      onChange={handleLastDateChange(index)}
                    />
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}><span className={styles.tx}></span> 투입 공수</span>
                    <input type="number" placeholder="ex. 1 or 0.5" className={styles.mm_tx} readOnly="true" name='reqMm' value={detFormData[index].reqMm} onChange={handleDetChange(index)}/>
                    <span className={styles.tx}>M/M</span>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.tx}>근무지</span>
                    <input type="text" placeholder="ex. 지역명 + 빌딩명 or 본사명" className={`${styles.txt} ${styles.w_txt}` } name="reqLoc" value={detFormData[index].reqLoc} onChange={handleDetChange(index)}/>
                  </div>
                  <div className={styles.item}>
                    <span className={`${styles.tx} ${styles.v_t}`}><span className={styles.essential_blt}>✓</span> 자격요건</span>
                    <textarea name="reqSkill" placeholder={`ex.\n- BtoC 서비스 개발/운영 경험\n- 원활한 커뮤니케이션 기술 및 협업 기술 경험`} className={styles.text_box} value={detFormData[index].reqSkill} onChange={handleDetChange(index)}></textarea>                    
                  </div>
                  <div className={styles.item}>
                    <span className={`${styles.tx} ${styles.v_t}`}><span className={styles.essential_blt}>✓</span> 기술</span>
<<<<<<< HEAD
                    <textarea name="reqPrefSkill" placeholder={`ex.\n- Java Spring Framework 기반의 개발 역량 보유\n- Vue, Ajax, Javascript 기반의 프론트엔드 개발 역량 보유\n- Oracle 쿼리 작성 역량 보유`} className={styles.text_box} value={detFormData[index].reqPrefSkill} onChange={handleDetChange(index)}></textarea>
=======
                    <textarea name="reqQualSkill" placeholder={`ex.\n- AI 서비스 기획/운영 경험 보유자\n- 금융기관 정보계 개발 및 운영 경험 보유자`} className={styles.text_box} value={detFormData[index].reqQualSkill} onChange={handleDetChange(index)}></textarea>
>>>>>>> c6c673d01c704eef7867be5044757c97d2b62bc6
                  </div>
                  <div className={styles.item}>
                    <span className={`${styles.tx} ${styles.v_t}`}>우대사항</span>
                    <textarea name="reqPrefSkill" placeholder={`ex.\n- CI/CD 경험\n- Unit/UI 테스트 작성 경험\n- GIT 기반의 소스코드 형상관리 경험`} className={styles.text_box} value={detFormData[index].reqPrefSkill} onChange={handleDetChange(index)}></textarea>
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