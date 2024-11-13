import { useState } from 'react';
import styles from '@styles/request.module.css';

const CheckBox = ({ id, label, name, checked, onChange }) => {
  return (
    <span className={styles.chk}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.check_box}
        hidden
      />
      <label htmlFor={id} className={styles.checkbox}>
        {label}
      </label>
    </span>
  );
};

export default CheckBox;