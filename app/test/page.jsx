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
      console.log(result);
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


// 컴포넌트가 마운트될 때 데이터 가져오기
useEffect(function() {
  // const result = fetchData('/api/req/list');
  // console.log(result);
    console.log("API 호출",error);
    submitData();
    console.log("API 호출 error",error);
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
    </div>
  );
}