"use client"

import { useEffect, useState, useRef } from 'react';
import styles from '@styles/detail.module.css';
import Detailstatus from '@components/detailstatus';
import Image from 'next/image';

export default function RegDetail({ item, initialValue, userInfo, handleEditClick,isEditing }) {
  const detailRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState([true]);          // details 아코디언 상태 배열로 관리
  const [isStatusVisible, setStatusVisible] = useState(false);     // 토글 상태 관리
  const [value, setValue] = useState(initialValue);                // 입력 값 상태

  console.log('📢 [regReqDetail.jsx:16]', userInfo);

  console.log('📢 [regReqDetail.jsx:17]', item);

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
        return status;
    }
  };

  
  const getStatusClass = (status) => {
    return styles[status] || '';
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleDetailsAccordion = (index) => {
    const updatedDetailsOpen = [...detailsOpen];
    updatedDetailsOpen[index] = !updatedDetailsOpen[index];
    setDetailsOpen(updatedDetailsOpen);
  };

  const handleStatusToggle = () => {
    setStatusVisible(!isStatusVisible); // 클릭 시 토글
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };


  // 컴포넌트 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        // 외부 클릭 시 handleStatusToggle 실행
        setStatusVisible(false);
      }
    }

    // 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return ( 
    item && (
      <div className={styles.detail_content}>
        <div className={`${styles.state} ${getStatusClass(item.reqStatus)}`}>
          {getStatusText(item.reqStatus)}
        </div>
        <h2>{item.reqTitle}</h2>
        <div className={styles.tx_info}>
          <span className={styles.priority}>유형 : {item.reqType2}</span>
          <span className={styles.blt}>•</span>
          <span className={styles.date}>요청일 {item.regDt.substring(0,10)}</span>
          <span className={styles.blt}>•</span>
          <span className={styles.num}>요청인원 {item.reqHeadcount}명</span>
        </div>
        <div className={styles.progress_section}>
        {item.reqStatus == 'register' ?
            <ul>
              <li className={styles.chk_tx}>✓ 접수</li>
              <li>진행</li>
              <li>완료</li>
            </ul>
          
          : item.reqStatus == 'progress' ?
              <ul>
                <li>✓ 접수</li>
                <li className={styles.chk_tx}>✓ 진행</li>
                <li>완료</li>
              </ul>   

            : item.reqStatus == 'cancel' ?
              <ul>
                <li className={styles.half}>✓ 접수</li>
                <li className={`${styles.chk_tx} ${styles.half}`}>✓ 취소</li>
              </ul>
            
            : item.reqStatus == 'complete' ?
              <ul>
                <li>접수</li>
                <li>진행</li>
                <li className={styles.chk_tx}>✓ 완료</li>
              </ul>

              :
              <ul>
                <li>✓ 접수</li>
                <li>✓ 진행</li>
                <li className={styles.chk_tx}>✓ 반려</li>
              </ul>
        }
        {item.reqStatus == 'register' ? 
          <progress className={styles.progressbar} value="33" min="0" max="100"></progress>
          : item.reqStatus == 'progress' ?
            <progress className={styles.progressbar} value="66" min="0" max="100"></progress>
            : item.reqStatus == 'cancel' ?
              <progress className={styles.progressbar_cancel} value="100" min="0" max="100"></progress>
              : item.reqStatus == 'complete' ?
              <progress className={styles.progressbar} value="100" min="0" max="100"></progress>
                :
                <progress className={styles.progressbar_cancel} value="100" min="0" max="100"></progress>
        }
        </div>
        <div className={styles.detail_prog} ref={detailRef}>
          <button onClick={handleStatusToggle}>상세 진행 현황</button>
          {isStatusVisible && (
            <div>
              <Detailstatus reqInfo={item} userInfo={userInfo} onClose={handleStatusToggle}/>
              <div className={styles.dim}></div>
            </div>
          )}
        </div>
        {/* 기본 정보 아코디언 */}
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
              <ul>
                <li><span className={styles.tit_tx}>업무명</span><span className={styles.p_tx}>{item.reqName}</span></li>
                <li><span className={styles.tit_tx}>대내·외 구분</span><span className={styles.p_tx}>{item.reqType == 1 ? '대내' : '대외'}</span></li>
                {/* <li className={styles.half_line2}><span className={styles.tit_tx}>인원</span><span className={styles.p_tx}>{item.reqHeadcount}명</span></li> */}
                <li><span className={styles.tit_tx}>목적</span><span className={styles.p_tx}>{item.reqPurp == 1 ? '구축' : item.reqPurp == 2 ? '운영' : item.reqPurp == 3 ? '개선/개발' : '기타'}</span></li>
              </ul>
            </div>
          )}
        </div>
        {/* 개별 details 정보 아코디언 */}
        {item.reqDet && item.reqDet.map((detail, index) => {
          const isDetailOpen = detailsOpen[index] || false;
          return (
            <div key={index} className={`${styles.accordion} ${styles.detail}`}>
              <div className={styles.title} onClick={() => toggleDetailsAccordion(index)}>
                <h3>
                  <Image
                    src="/images/detail/ico_partners.png"
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
                  <ul>
                    <li className={styles.half_line1}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>인원</span>
                          <input
                            type="text"
                            placeholder={`${item.reqHeadcount}`}
                            onChange={handleInputChange}
                            className={styles.txt}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>인원</span>
                          <span className={styles.p_tx}>{item.reqHeadcount}명</span>
                        </div>
                      )}                   
                    </li>
                    <li className={styles.half_line2}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>직무 구분</span>
                          <input
                            type="text"
                            placeholder={`${detail.reqJob}`}
                            onChange={handleInputChange}
                            className={styles.txt}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>직무 구분</span>
                          <span className={styles.p_tx}>{detail.reqJob}</span>
                        </div>
                      )}                       
                    </li>
                    <li className={`${styles.half_line1} ${styles.pt}`}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>유형</span>
                          <input
                            type="text"
                            placeholder={`${detail.reqType}`}
                            onChange={handleInputChange}
                            className={styles.txt}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>유형</span>
                          <span className={styles.p_tx}>{detail.reqType}</span>
                        </div>
                      )}                      
                    </li>
                    <li className={`${styles.half_line2} ${styles.pt}`}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>등급</span>
                          <input
                            type="text"
                            placeholder={`${detail.reqGrade}`}
                            onChange={handleInputChange}
                            className={styles.txt}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>등급</span>
                          <span className={styles.p_tx}>{detail.reqGrade}</span>
                        </div>
                      )}                      
                    </li>
                    <li className={`${styles.half_line1} ${styles.pt}`}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>투입 예정일</span>
                          <input
                            type="text"
                            placeholder={`${detail.reqInDt.substring(0,10)}`}
                            onChange={handleInputChange}
                            className={styles.txt}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>투입 예정일</span>
                          <span className={styles.p_tx}>{detail.reqInDt.substring(0,10)}</span>
                        </div>
                      )}
                    </li>
                    <li className={`${styles.half_line2} ${styles.pt}`}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>투입 종료일</span>
                          <input
                            type="text"
                            placeholder={`${detail.reqOutDt ? detail.reqOutDt.substring(0,10) : '미정'}`}
                            onChange={handleInputChange}
                            value={detail.reqOutDt}
                            className={styles.txt}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>투입 종료일</span>
                          <span className={styles.p_tx}>{detail.reqOutDt ? detail.reqOutDt.substring(0,10) : '미정'}</span>
                        </div>
                      )}
                    </li>
                    <li className={`${styles.half_line1} ${styles.pt}`}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>투입 공수</span>
                          <input
                            type="text"
                            placeholder={`${detail.reqMm ? detail.reqMm + ' M/M': '미정'}`}
                            onChange={handleInputChange}
                            className={styles.txt}
                          />
                          M/M
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>투입 공수</span>
                          <span className={styles.p_tx}>{detail.reqMm ? detail.reqMm + ' M/M' : '미정'} </span>
                        </div>
                      )}
                    </li>
                    <li className={`${styles.half_line2} ${styles.pt}`}>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit}>근무지</span>
                          <input
                            type="text"
                            placeholder={`${detail.reqLoc ? detail.reqLoc : '미정'}`}
                            onChange={handleInputChange}
                            className={styles.txt}
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>근무지</span>
                          <span className={styles.p_tx}>{detail.reqLoc ? detail.reqLoc : '미정'}</span>
                        </div>
                      )}
                    </li>
                    <li>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit_line}>자격 조건</span>
                          <textarea
                            name="reqSkill"
                            placeholder={`${detail.reqSkill}`}
                            className={styles.text_box}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>자격 조건</span>
                          <span className={styles.p_tx} style={{ whiteSpace: 'pre-wrap' }}>{detail.reqSkill}</span>
                        </div>
                      )}
                    </li>
                    <li>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit_line}>기술</span>
                          <textarea
                            name="reqQualSkill"
                            placeholder={`${detail.reqQualSkill}`}
                            className={styles.text_box}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>기술</span>
                          <span className={styles.p_tx} style={{ whiteSpace: 'pre-wrap' }}>{detail.reqQualSkill}</span>
                        </div>
                      )}
                    </li>
                    <li>
                      {isEditing ? (
                        <div>
                          <span className={styles.tit_tx_edit_line}>우대사항</span>
                          <textarea
                            name="reqPrefSkill"
                            placeholder={`${detail.reqPrefSkill}`}
                            className={styles.text_box}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      ) : (
                        <div>
                          <span className={styles.tit_tx}>우대사항</span>
                          <span className={styles.p_tx} style={{ whiteSpace: 'pre-wrap' }}>{detail.reqPrefSkill}</span>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {userInfo.authCd == 'request' ? (
          item.reqStatus == 'register' ? (
            <div className={styles.btn_section}>
              <button className={styles.cancel_btn} onClick={() => handleEditClick('cancel')}>요청취소</button>
              <button className={styles.aply_btn} onClick={() => handleEditClick('Edit')}>수정</button>
            </div>
          ) : item.reqStatus == 'cancel' ? (
            <div className={styles.btn_section}>
              <button className={styles.aply_btn} onClick={() => handleEditClick('register')}>요청재개</button>
            </div>
          ) : (
            <div></div>
          )
        ):(
          item.reqStatus == 'register' ? (
            <div className={styles.btn_section}>
              <button className={styles.aply_btn} onClick={() => handleEditClick('progress')}>진행</button>
            </div>
          ) : item.reqStatus == 'progress' ? (
            <div className={styles.btn_section}>
              <button className={styles.cancel_btn} onClick={() => handleEditClick('return')}>반려</button>
              <button className={styles.aply_btn} onClick={() => handleEditClick('complete')}>완료</button>
            </div>
          ) : (
            <div></div>
          )
        )}

      </div>
    )
  );
}