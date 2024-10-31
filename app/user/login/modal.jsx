
import AuthForm from './authForm';
import styles from '../../styles/modal.module.css';

export default function Modal({ type }) {

  return (
    <div className={styles.modal}>
      <div className={`${styles.content} ${type === 'findPassword' ? styles.password : ''}`}>
        <AuthForm type={type} />
      </div>
      <div className={styles.dim}></div>
    </div>
  );
}