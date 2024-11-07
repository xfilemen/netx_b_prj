"use client";

import React, { useEffect, useRef, useState } from 'react';
import RegDetail from '../detail/regReqDetail.jsx';
import styles from '@styles/detail.module.css';
import Image from 'next/image';
import apiHandler from '../../utils/api-handler.js';
import { useSession, signIn, signOut } from "next-auth/react";

export default function RegularPage({ item }) {
  const [listSelectIdx, setListSelectIdx] = useState(null); // li on 포커스
  const [pageSelectItem, setPageSelectItem] = useState(null); // 정규인력 요청·내역 상세페이지 연결

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const isGetData = useRef(false);

  const [typeData, setTypeData] = useState('');

  const showDetailPage = (index, item) => {
    setListSelectIdx(index);
    setPageSelectItem(item);
    console.log(index, item);
    setIsEditing(false);
  };

  const { data: session } = useSession();
  let userInfo = {};
  userInfo = session?.user || {};
  console.log(userInfo);
  console.log('📢 [page.jsx:29]', session);


  const getData = async (url) => {
    console.log('📢 [page.jsx:26]', url);
    const result = await apiHandler.postData(url); // POST 요청
    console.log('요청 전체 조회 : ',result.data);
    for (let index = 0; index < result.data.length; index++) {

      let typeData2 = '';
      if (result.data[index].reqDet.length > 0) {
        for (let index2 = 0; index2 < result.data[index].reqDet.length; index2++) {
          console.log('📢 [page.jsx:37]** 확인 :: ', result.data[index].reqDet[index2].reqType);
          if (result.data[index].reqDet[index2].reqType.includes('BP') && result.data[index].reqDet[index2].reqType.includes('정규직')) {
            result.data[index].reqDet[index2].reqType = '정규직, BP';

            typeData2 = typeData2 + '정규직, BP';
          }else if (result.data[index].reqDet[index2].reqType.includes('BP')){
            typeData2 = typeData2 + 'BP';
          } else if (result.data[index].reqDet[index2].reqType.includes('정규직')) {
            typeData2 = typeData2 + '정규직';
          }
          console.log('📢 [page.jsx:37]** 확인2 :: ', result.data[index].reqDet[index2].reqType);
        }
      }

      if (typeData2.includes('BP') && typeData2.includes('정규직')) {
        result.data[index].reqType2 = '정규직, BP';
      } else if (typeData2.includes('BP')) {
        result.data[index].reqType2 = 'BP';
      } else if (typeData2.includes('정규직')) {
        result.data[index].reqType2 = '정규직';
      }
      
    }
    
    setData(result.data);
    isGetData.current = true;
    // ++isGetData.current;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'register':
        return '접수';
      case 'progress':
        return '진행';
      case 'cancel':
        return '취소';
      case 'return':
        return '반려';
      case 'complete':
        return '완료';
      default:
        return status; // 다른 상태는 원래 값을 사용
    }
  };

  const getStatusClass = (status) => {
    return styles[status] || '';
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(function() {
      console.log("API 호출");
      getData('/api/req/list');
  }, []);

  useEffect(function() {
    console.log('📢 [page.jsx:56]', data);
  }, [data]);

  const handleEditClick = (param) => {
    console.log('📢 [regReqDetail.jsx:56]', param);
    if (param == 'Edit') {
      setIsEditing(true);
    } else {

      modiApi(param);
      
    }
  };

  const [isEditing, setIsEditing] = useState(false);               // 수정 상태 변경

  const modiApi = (data) => {
    console.log('📢 [page.jsx:104]', data);
    // const result =  apiHandler.postData('/api/req/modify',{
    //   data:data
    // }); // POST 요청
    // console.log('reqRegist : ',result);
  }

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
        <div className={styles.left_section}>
          <div className={styles.title}>
            <h2>인력 요청·내역</h2>
            <p className={styles.tit_tx}>요청 내역을 확인하실 수 있습니다.</p>
            {isGetData.current}
            {/* {isGetData} */}
            {/* <div className={styles.btn}>
              <button>Filter</button>
            </div> */}
          </div>
          <div className={styles.item_list}>
            <div className={styles.list_items}>
              <ul>
                {
                  data.length > 0 ? (
                    data.map((item, index) => (
                      <li key={item.id} onClick={() => showDetailPage(index, item)} className={`${listSelectIdx === index ? styles.on : ''}`}>
                        <div className={`${styles.state} ${getStatusClass(item.reqStatus)}`}>
                          {getStatusText(item.reqStatus)}
                        </div>
                        <div className={styles.section}>
                          <p className={styles.tit_tx}>{item.reqTitle}</p> 
                          <div className={styles.tx_info}>
                            <span className={styles.priority}>유형 : {item.reqType2}</span>
                            <span className={styles.blt}>•</span>
                            <span className={styles.date}>요청일 {item.regDt.substring(0,10)}</span>
                            <span className={styles.blt}>•</span>
                            <span className={styles.num}>요청인원 {item.reqHeadcount}명</span>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : isGetData.current ? 
                    (
                      <li className={styles.nodata}>데이터가 없습니다.</li>
                    ) : ""
                }
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.right_section}>
            <RegDetail item={pageSelectItem} userInfo={userInfo} handleEditClick={handleEditClick} isEditing={isEditing}/>
        </div>
      </div>
    </div>
  );
}