'use client';

import styles from '/app/styles/main.module.css';
import { useEffect, useState } from 'react';

export default function LoginPage() { 

  const [cj_id, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cj_id, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      location.href = '/detail';
    } else {
      alert(data.message);
    }
  };

  const test = () => {
    location.href = '/detail';
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginbg}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <h1>Login</h1>
            <input
              type="text"
              placeholder="CJ WORLD 계정"
              value={cj_id}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

