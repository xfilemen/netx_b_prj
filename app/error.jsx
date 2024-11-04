// app/error.js

'use client'; // Client 컴포넌트로 설정

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import style from '/app/styles/notfound.module.css';
import Header from '/app/components/header';
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
                    <h2>다시 한번 확인해 주세요!</h2>
                    <p>지금 입력하신 주소의 페이지는 삭제되었거나 다른 페이지로 변경되었습니다.<br />주소를 다시 확인해 주세요.1212</p>
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
