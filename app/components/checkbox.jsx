import { useState } from 'react';
import styles from '@styles/request.module.css';

const CheckBox = ({ label, name, checked, onChange }) => {
  return (
    <span className={styles.chk}>
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
        />
        <label>{label}</label>
    </span>
  );
};

export default CheckBox;