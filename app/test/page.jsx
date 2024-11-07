"use client";

import React, { useEffect,useState } from 'react';
import styles from '../styles/detail.module.css';
import Image from 'next/image';
import apiHandler from '../../utils/api-handler';
import Modal from '../test/modal';
import Modal2 from '../test/modal2';

export default function RegularPage({ item }) { 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType2, setModalType2] = useState(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);


  

  const main = {
    "reqId": 22,
    "reqTitle": "testTitle",
    "reqName": "회계시스템 선진화",
    "reqOrd": "High",
    "reqStatus": "register",
    "reqType": "1",
    "reqHeadcount": null,
    "reqPurp": "이번 프로젝트에서 만 14세 미만 및 휴대폰 본인인증 불가 고객 회원가입 프로세스를 신설하여 고객 불만을 해소하고 시스템 고도화를 통해 신규 고객 확대를 강화를 목적으로 합니다. 또한 간편모드 서비스를 신설하여 손쉬운 CJ PAY UI/UX를 경험할 수 있도록 개선할 예정입니다.",
    "useYn": null,
    "confDt": null,
    "confId": null,
    "regDt": "2024-08-29T00:00:00.000Z",
    "regId": null,
    "modDt": null,
    "modId": null,
    "reqDet": [
        {
            "reqId": 22,
            "reqDetId": 32,
            "reqType": "시스템 개선",
            "reqHeadcount": null,
            "reqJob": "회계",
            "reqJobDet": null,
            "reqGrade": "3",
            "reqInDt": "2024-09-01T00:00:00.000Z",
            "reqOutDt": null,
            "reqMm": 3,
            "reqLoc": "서울",
            "reqSkill": "Java, Spring",
            "useYn": "Y",
            "regDt": "2024-10-17T07:07:55.332Z",
            "regId": null,
            "modDt": null,
            "modId": null
        },
        {
            "reqId": 22,
            "reqDetId": 33,
            "reqType": "데이터 분석",
            "reqHeadcount": null,
            "reqJob": "데이터 엔지니어",
            "reqJobDet": null,
            "reqGrade": "2",
            "reqInDt": "2024-10-01T00:00:00.000Z",
            "reqOutDt": "2025-01-31T00:00:00.000Z",
            "reqMm": 4,
            "reqLoc": "부산",
            "reqSkill": "Python, R",
            "useYn": "Y",
            "regDt": "2024-10-17T07:07:55.332Z",
            "regId": null,
            "modDt": null,
            "modId": null
        },
        {
            "reqId": 22,
            "reqDetId": 34,
            "reqType": "시스템 개선",
            "reqHeadcount": null,
            "reqJob": "회계",
            "reqJobDet": null,
            "reqGrade": "3",
            "reqInDt": "2024-09-01T00:00:00.000Z",
            "reqOutDt": null,
            "reqMm": 3,
            "reqLoc": "서울",
            "reqSkill": "Java, Spring",
            "useYn": "Y",
            "regDt": "2024-10-17T07:07:55.332Z",
            "regId": null,
            "modDt": null,
            "modId": null
        },
        {
            "reqId": 22,
            "reqDetId": 35,
            "reqType": "데이터 분석",
            "reqHeadcount": null,
            "reqJob": "데이터 엔지니어",
            "reqJobDet": null,
            "reqGrade": "2",
            "reqInDt": "2024-10-01T00:00:00.000Z",
            "reqOutDt": "2025-01-31T00:00:00.000Z",
            "reqMm": 4,
            "reqLoc": "부산",
            "reqSkill": "Python, R",
            "useYn": "Y",
            "regDt": "2024-10-17T07:07:55.332Z",
            "regId": null,
            "modDt": null,
            "modId": null
        },
        {
            "reqId": 22,
            "reqDetId": 36,
            "reqType": "데이터 분석",
            "reqHeadcount": null,
            "reqJob": "데이터 엔지니어",
            "reqJobDet": null,
            "reqGrade": "2",
            "reqInDt": "2024-10-01T00:00:00.000Z",
            "reqOutDt": "2025-01-31T00:00:00.000Z",
            "reqMm": 4,
            "reqLoc": "부산",
            "reqSkill": "Python, R",
            "useYn": "Y",
            "regDt": "2024-10-17T07:07:55.332Z",
            "regId": null,
            "modDt": null,
            "modId": null
        }
    ]
}

  

  const submitData = async () => {
    try {
      const result = await apiHandler.postData('/api/req/list'); // POST 요청
      console.log('요청 전체 조회 : ',result);
      if(result.data === undefined){
        setError(error);

      }else{
        setData(result.data);

      }
    } catch (error) {
      console.log('error',error);
      setError(error);
    }
  };

  

  const brdPostData = async () => {
    try {
      const result = await apiHandler.postData('/api/brd/post/list'); // POST 요청
      console.log('게시물 전체 조회 : ',result);
      if(result.data === undefined){

      }else{
        console.log(result.data);
      }
    } catch (error) {
      console.log('error',error);
      setError(error);
    }
};

const reqRegist = async () => {
    try {
      console.log({params:{
        data
      }});
      const result = await apiHandler.postData('/api/req/regist',{
        data:data
      }); // POST 요청
      console.log('reqRegist : ',result);
      if(result.data === undefined){

      }else{
        console.log(result.data);
      }
    } catch (error) {
      console.log('error',error);
      setError(error);
    }
};


const reqModify = async () => {
  try {
    main.reqTitle ='수정됨'+(new Date());
    console.log({params:{
      main
    }});
    const result = await apiHandler.postData('/api/req/modify',{
      data:main
    }); // POST 요청
    console.log('reqRegist : ',result);
    if(result.data === undefined){

    }else{
      console.log(result.data);
    }
  } catch (error) {
    console.log('error',error);
    setError(error);
  }
};

const boardRegist = async () => {
  try {
    const result = await apiHandler.postData('/api/brd/post/regist',{data : {
      brdId : 3,
      pstTitle : '공지사항 제목 test',
      pstContents : '공지사항 내용 test',
      viewYn : 'Y',
      regId : 'test',
      modId : 'test'
    }
    }); // POST 요청
    console.log('reqRegist : ',result);
    if(result.data === undefined){

    }else{
      console.log(result.data);
    }
  } catch (error) {
    console.log('error',error);
    setError(error);
  }
};
const codeSelect = async () => {
  try {
    const result = await apiHandler.postData('/api/common/code/select',{
      codeGrp : 'G001',
      
    }); // POST 요청
    console.log('codeSelect : ',result);
    if(result.data === undefined){

    }else{
      console.log(result.data);
    }
  } catch (error) {
    console.log('error',error);
    setError(error);
  }
};


const openModal = (type) => {
  setModalType(type); // 모달 타입 설정
  setIsModalOpen(true); // 모달 열기
};

const closeModal = () => {
  setIsModalOpen(false); // 모달 닫기
  setModalType(null); // 모달 타입 초기화
};


const openModal2 = (type) => {
  setModalType2(type); // 모달 타입 설정
  setIsModalOpen2(true); // 모달 열기
};

const closeModal2 = () => {
  setIsModalOpen2(false); // 모달 닫기
  setModalType2(null); // 모달 타입 초기화
};

  // 그룹사 코드 호출
  const tbReqMgtLog = async () => {
    await apiHandler.fetchPostData('/api/req/log/list',{
        data : {reqId : 4},
      },
      (result,error)=>{
        if(result.data){
          console.log('tbReqMgtLog',result);
        }else{
          console.log(result.data);
        }
      }
    );
  };



// 컴포넌트가 마운트될 때 데이터 가져오기
useEffect(function() {
  // const result = fetchData('/api/req/list');
  // console.log(result);
    console.log("API 호출 start",error);
    submitData();
    brdPostData();
    codeSelect();
    tbReqMgtLog();

    
    console.log("API 호출 end",error);
}, []);

  return (
    <div className={styles.content}>
      {error && <div>Error: {error}</div>}
       {/* 데이터가 로드되지 않았을 때 */}
       {data.length === 0 ? (
        <div>Loading...</div>
      ) : (
        data.map((item, index) => (
          <div key={index}>
            <div>reqPurp: {item.reqPurp}</div>
            <div>reqStatus: {item.reqStatus}</div>
            {/* 추가적인 항목들을 여기에 추가 */}
          </div>
        ))
      )}
      <div>
        <button onClick={reqRegist}>요청 등록하기 api 호출</button>
        <button onClick={reqModify}>요청 수정하기 api 호출</button>
        <button onClick={() => openModal('requestAccount')}>계정생성 요청</button>
        <button onClick={() => openModal2('requestAccount')}>계정생성 요청2</button>
      </div>
      <div>
        <button onClick={boardRegist}>게시물 등록하기 api 호출</button>
      </div>
     
      <div>{isModalOpen && <Modal type={modalType} />}</div>
      <div>{isModalOpen2 && <Modal2 type={modalType2} closeModal={closeModal2} />}</div>
    </div>
  );
}