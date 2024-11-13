"use client";

import React, { useEffect,useState } from 'react';
import styles from '@styles/detail.module.css';
import Image from 'next/image';
import apiCall from '@utils/api-call';

export default function RegularPage({ item }) { 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  
const codeSelect = async () => {
  try {
    const result = await apiCall.postData('/api/common/code/select',{
    }); // POST 요청
    console.log('codeSelect : ',result);
    if(result.data){
      setData(result.data);
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
    console.log("API 호출 start",error);
    codeSelect();
    console.log("API 호출 end",error);
}, []);

  return (
    <div style={{ 
      padding: '100px', 
  }}>
      <h2>코드 테이블</h2>
      {/* 테이블 컨테이너에 스크롤, 너비, 여백 설정 */}
      <div style={{ 
              maxHeight: '400px', 
              width: '500px', 
              overflowY: 'auto', 
              border: '1px solid #ccc', 
              padding: '10px', 
              boxSizing: 'border-box' 
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                      <tr>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Code</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Code Name</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.length > 0 ? (
                          data.map((item, index) => (
                              <tr key={index}>
                                  <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{item.code}</td>
                                  <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{item.codeName}</td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="2" style={{ textAlign: 'center', padding: '8px' }}>데이터가 없습니다.</td>
                          </tr>
                      )}
                  </tbody>
            </table>
        </div>
      </div>
  );
}