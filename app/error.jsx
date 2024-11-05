// app/error.js

'use client'; // Client 컴포넌트로 설정

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import style from '@styles/notfound.module.css';
import Header from '@components/header';
import Link from 'next/link';

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
    <div className={style.container}>
        <Header />
        <div className={style.content}>
            <div className={style.wrap}>
                <div className={style.not_page}>
                    <h2>잠시 후 다시 확인해 주세요!</h2>
                    <p>지금 서비스와 연결할 수 없습니다.<br/>문제를 해결하기 위해 열심히 노력하고 있습니다.<br/>잠시 후 다시 확인해 주세요.</p>
                    <div className={style.btn}>
                        <Link href={'/main'}>
                            메인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CustomErrorPage;
