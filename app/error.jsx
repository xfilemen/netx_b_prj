// app/error.js

'use client'; // Client 컴포넌트로 설정

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CustomErrorPage = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      // 여기서 사용자가 지정한 오류 페이지로 리디렉션할 수 있습니다.
     // router.push('/error'); // '/error' 경로로 이동
     console.log(error);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>오류가 발생했습니다!</h1>
      <p>{error.message}</p>
      <p>Redirecting...</p>
    </div>
  );
};

export default CustomErrorPage;
