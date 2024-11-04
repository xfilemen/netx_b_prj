
import AuthForm from './authForm';
import styles from '../../styles/modal.module.css';

export default function Modal({ type,closeModal }) {

  return (
    <div className={styles.modal}>
      <div className={`${styles.content} ${type === 'findPassword' ? styles.password : ''}`}>
        <AuthForm type={type} closeModal={closeModal} />
      </div>
      <div className={styles.dim}></div>
    </div>
  );
}