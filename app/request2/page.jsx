"use client";

import React, { useEffect, useState } from 'react';
import styles from '@styles/request.module.css';
import SelectBox from '@components/select';
import Reqrow from '@components/reqrowdetail';
import Image from 'next/image';
import apiCall from '../../utils/api-call';

export default function RegPage() {
  const [selectedHeadcount, setSelectedHeadcount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // 대내외 구분
  const reqType = [
    { value: '1', label: '대내' },
    { value: '2', label: '대외' },
  ];

  // 목적
  const reqPurp = [
    { value: '1', label: '구축' },
    { value: '2', label: '운영' },
    { value: '3', label: '개선/개발' },
    { value: '4', label: '기타' },
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
        } else if (detFormData[index].reqMm == '') {
            alert((checkNum) + '번째 투입 공수를 입력하지 않았습니다.');
            return true;
        } else if (detFormData[index].reqLoc.trim() == '') {
          alert((checkNum) + '번째 근무지를 입력하지 않았습니다.');
          return true;
        } else if (detFormData[index].reqSkill.trim() == '') {
          alert((checkNum) + '번째 필수 요구기술을 입력하지 않았습니다.');
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

  const [checkState, setCheckState] = useState([]);

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
                src={isOpen ? "/images/detail/ico_ac_down.png" : "/images/detail/ico_ac_up.png"}
                alt={isOpen ? "열기" : "닫기"}
                width={12}
                height={6}
                className={styles.arrowIcon}
              />
            </span>
          </div>
          {!isOpen && (
            <div className={styles.content}>
              <div className={styles.item}>
                <span className={styles.tx}>업무명</span>
                <input type="text" placeholder="ex. CJ PAY Back-End 개발 or CJ ENM 차세대 K-POP 플랫폼 구축" 
                className={styles.txt} name="reqTitle" value={formData.reqTitle} onChange={handleChange}/>
              </div>
              <div className={styles.item_half}>
                <label>대내외 구분</label>
                <SelectBox options={reqType} name="reqType" onChange={handleChange}/>
              </div>
              <div className={styles.item}>
                <label>목적</label>
                <SelectBox options={reqPurp} name="reqPurp" onChange={handleChange}/>
              </div>
            </div>
          )}
        </div>
      
        <Reqrow />

      </div>
      <div className={styles.btn_section}>
        <button className={styles.cancel_btn} onClick={goMian}>취소</button>
        <button className={styles.aply_btn} onClick={insertData}>등록</button>
      </div>
    </div>
  );
}