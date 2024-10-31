import SelectBox from '../../components/select';
import styles from '../../styles/modal.module.css';

export default function AuthForm({ type }) {
    
    const accountType = [
        { value: '1', label: '요청자' },
        { value: '2', label: '신청자' },
    ];

    const groupType = [
        { value: '1', label: '디아이웨어' },
        { value: '2', label: 'CJ 올리브네트웍스' },
    ];
    return (
      <form>
        {/*{type === 'signup' && (
          <>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
          </>
        )}
        {type === 'changePassword' && (
          <>
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <button type="submit">Change Password</button>
          </>
        )}*/}
        {type === 'requestAccount' && (
            <div className={styles.req_cont}>
                <h2>계정생성요청</h2>
                <div className={styles.area}>
                  <div className={styles.item_half_left}>
                      <label>계정구분</label>
                      <SelectBox options={accountType} name="accountType"/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>이름</label>
                      <input type="text" autoComplete="new-username" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>그룹사</label>
                      <SelectBox options={groupType} name="groupType"/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>소속</label>
                      <input type="text" autoComplete="new-group" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>비밀번호</label>
                      <input type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_right}>
                      <label>비밀번호 확인</label>
                      <input type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item}>
                      <label>휴대폰번호</label>
                      <input type="number" className={styles.num} />
                      <span className={styles.line}>-</span>
                      <input type="number" className={styles.num} />
                      <span className={styles.line}>-</span>
                      <input type="number" className={styles.num} />
                      <span className={styles.certify_aply_btn}>
                        <button>인증번호 발송</button>
                      </span>
                  </div>
                  <div className={styles.item}>
                      <label>인증번호</label>
                      <input type="text" className={styles.txt} />
                      <span className={styles.certify_num}>03:00</span>
                      <span className={styles.certify_btn}>
                        <button>인증</button>
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
                    <input type="checkbox" className={styles.chk_box}/>
                    본인은 상기 내용을 준수하고 동의합니다.
                  </p>
                </div>
                <div className={styles.btn_section}>
                  <button className={styles.aply_btn}>확인</button>
                  <button className={styles.cancel_btn}>취소</button>
                </div>
            </div>
        )}
      </form>
    );
  }