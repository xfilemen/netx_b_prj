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
                <div className={styles.item_half_left}>
                    <label>계정구분</label>
                    <SelectBox options={accountType} name="accountType"/>
                </div>
                <div className={styles.item_half_right}>
                    <label>이름</label>
                    <input type="text" className={styles.txt} />
                </div>
                <div className={styles.item_half_left}>
                    <label>그룹사</label>
                    <SelectBox options={groupType} name="groupType"/>
                </div>
                <div className={styles.item_half_right}>
                    <label>소속</label>
                    <input type="text" className={styles.txt} />
                </div>
            </div>
        )}
      </form>
    );
  }