import { useState, useEffect } from 'react';
import './css/global.css';
import styles from './css/main.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>김성환 천재12</h1>
    </div>
  );
}