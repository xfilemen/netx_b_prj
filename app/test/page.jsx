"use client";

import React, { useEffect,useState } from 'react';
import RegDetail from '../detail/regReqDetail.jsx';
import requstData from '../data/regRequstList.json';
import styles from '../styles/detail.module.css';
import Image from 'next/image';

export default function RegularPage({ item }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

 // 데이터 가져오는 함수
 const fetchData = async () => {

  const res = await fetch('/api/req/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (res.ok) {
    console.log(data);  // 가져온 데이터
  } else {
    alert(data.message);
  }

};

// 컴포넌트가 마운트될 때 데이터 가져오기
useEffect(() => {
  fetchData();
}, []);

  return (
    <div className={styles.content}>

    </div>
  );
}