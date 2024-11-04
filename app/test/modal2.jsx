
import AuthForm from './authForm2';
import styles from '../styles/modal.module.css';

export default function Modal({ type }) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <AuthForm type={type} />
      </div>
      <div className={styles.dim}></div>
    </div>
  );
}