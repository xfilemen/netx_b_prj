import React, { useEffect,useState } from 'react';
import SelectBox from './select';
import styles from '../styles/modal.module.css';
import { useForm } from "react-hook-form";
import {nameValid,passwordValid,mobNumValid,required,matchValid} from '../../utils/user-validation';
import {maxLength,timer} from '../../utils/common-util';

export default function AuthForm({ type,closeModal }) {
  const { register, handleSubmit, watch , getValues, control, formState: { errors }} = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const { time, start, stop, reset, isActive } = timer("03:00");


  //인증번호 발송
  const authCodeSend = () => {
    const mobNum = watch(["mobNum1", "mobNum2", "mobNum3"]);
    if(mobNum[0].length !== 3 || mobNum[1].length !== 4 || mobNum[2].length !== 4){
      alert("휴대폰번호를 입력하세요");
      return;
    }
    setIsVisible(true);
    reset();
    start();
  };

  //인증번호 확인
  const authCodeCheck = () => {
    reset();
  };


  //form submit
  const onSubmit = (data) => {
    if (window.confirm("계정 생성을 요청하시겠습니까?")) {
      console.log("폼 데이터:", data);
      console.log(errors);
    }
  };

  //validation 체크
  const onError = () => {
    console.log(errors);
    // if (Object.keys(errors).length > 0) {
    //   const errorMessages = Object.values(errors) 
    //                               .map(error => error.message) 
    //                               .join(','); 
    //   alert(`${errorMessages}이 누락되었습니다.`);
    // }
  };

  const accountType = [
      { value: 'request', label: '요청자' },
      { value: 'approve', label: '승인자' },
  ];  

  const groupType = [
      { value: 'U001', label: '디아이웨어' },
      { value: 'U002', label: 'CJ 올리브네트웍스' },
  ];


    return (
      <form onSubmit={handleSubmit(onSubmit,onError)}>
           {type === 'requestAccount' && (
            <div className={styles.req_cont}>
                <h2>계정생성요청</h2>
                <div className={styles.area}>
                  <div className={styles.item_half_left}>
                      <label>계정구분</label>
                      <SelectBox register={register("authCd", required("authCd"))} options={accountType}/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>이름</label>
                      <input {...register("userName", nameValid())} type="text" autoComplete="new-username" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>그룹사</label>
                      <SelectBox register={register("compCd", required("compCd"))} options={groupType} name="compCd"/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>소속</label>
                      <input {...register("deptName", required("deptName"))} type="text" placeholder="ex. 테이터 마케팅팀" autoComplete="new-group" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>비밀번호</label>
                      <input {...register("userPwd", passwordValid())} type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_right}>
                      <label>비밀번호 확인</label>
                      <input {...register("userPwd2", matchValid("userPwd2",getValues("userPwd")))} type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item}>
                      <label>CJ WORLD ID</label>
                      <input {...register("userId", required("userId"))} type="text" className={styles.txt} />
                  </div>
                  <div className={styles.item}>
                      <label>휴대폰번호</label>
                      <input {...register("mobNum1", mobNumValid(3))} type="number" className={styles.num} onKeyDown={(e) => maxLength(e,3)} />
                      <span className={styles.line}>-</span>
                      <input {...register("mobNum2", mobNumValid(4))} type="number" className={styles.num} onKeyDown={(e) => maxLength(e,4)} />
                      <span className={styles.line}>-</span>
                      <input {...register("mobNum3", mobNumValid(4))} type="number" className={styles.num} onKeyDown={(e) => maxLength(e,4)} />
                      <span className={styles.certify_aply_btn}>
                        <button type="button" onClick={authCodeSend}>인증번호 발송</button>
                      </span>
                  </div>
                  <div className={styles.item} id="authCheck" style={{ display: isVisible ? "block" : "none" }}>
                      <label>인증번호</label>
                      <input type="text" className={styles.txt} />
                      <span className={styles.certify_num}>{time}</span>
                      <span className={styles.certify_btn}>
                        <button type="button" onClick={authCodeCheck}>인증</button>
                      </span>
                  </div>
                </div>
                <div className={styles.info_tx}>
                  <ul>
                    <li><span className={styles.bul_dot}></span>회사의 업무용 시스템(PC자산 포함)은 업무 목적에 한정하여 사용함을 원칙으로 한다.</li>
                    <li><span className={styles.bul_dot}></span>업무용 시스템을 사용함에 있어서는 회사의 규정을 준수하고, CJ 구성원의 사생활과 명예를 존중하는 방식으로 올바르게 사용하여야 한다.</li>
                    <li><span className={styles.bul_dot}></span>패스워드는 타인에게 노출되지 않도록 안전하게 관리하여야 한다.</li>
                    <li><span className={styles.bul_dot}></span>별도의 허가 및 부득이한 사유 없이 타인의 PC 및 타인의 계정을 이용하지 않아야 한다.</li>
                    <li><span className={styles.bul_dot}></span>사내망을 통해 다른 직원의 PC에 임의로 접근하여, 파일을 열람, 변조, 삭제하지 않아야 한다.</li>
                    <li><span className={styles.bul_dot}></span>회사는 정보자산의 보호 및 부정행위 예방/대응을 위하여 임직원의 회사 업무용 시스템 사용 내역을 기록하고 모니터링 할 수 있다.</li>
                  </ul>
                  <p className={styles.chk_p}>
                    <input {...register("agrYn", matchValid("agrYn","Y"))}  type="checkbox" value='Y' className={styles.chk_box}/>
                    본인은 상기 내용을 준수하고 동의합니다.
                  </p>
                </div>
                <div className={styles.btn_section}>
                  <button className={styles.aply_btn}>확인</button>
                  <button type='button' className={styles.cancel_btn} onClick={closeModal}>취소</button>
                </div>
            </div>
        )}
        {type === 'findPassword' && (
         <div className={`${styles.req_cont} ${styles.resize}`}>
            <h2>비밀번호 찾기</h2>
            <div className={styles.section}>
              <div className={styles.item}>
                <label>소속</label>
                <input type="text" className={styles.txt} />
              </div>
            </div>
          </div>
        )}
      </form>
    );
  }