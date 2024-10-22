"use client";

import React, { useEffect,useState } from 'react';
import styles from '../styles/detail.module.css';
import Image from 'next/image';
import apiHandler from '../../lib/api-handler';

export default function RegularPage({ item }) { 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  

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
      const result = await apiHandler.postData('/api/req/regist',{
        reqTitle : '요청 타이틀',
        reqName : '요청명',
        reqOrd : '2',
        reqStatus : 'regist',
        reqType : '1',
        reqHeadcount : 1,
        reqPurp : '운영'
        
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
    const result = await apiHandler.postData('/api/brd/post/regist',{
      brdId : 3,
      pstTitle : '공지사항 제목 test',
      pstContents : '공지사항 내용 test',
      viewYn : 'Y',
      regId : 'test',
      modId : 'test'
      
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
    const result = await apiHandler.postData('/api/code/select',{
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



// 컴포넌트가 마운트될 때 데이터 가져오기
useEffect(function() {
  // const result = fetchData('/api/req/list');
  // console.log(result);
    console.log("API 호출 start",error);
    submitData();
    brdPostData();
    codeSelect();
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
      </div>
      <div>
        <button onClick={boardRegist}>게시물 등록하기 api 호출</button>
      </div>
    </div>
  );
}