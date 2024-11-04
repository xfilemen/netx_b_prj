import style from '/app/styles/notfound.module.css';
import Header from '/app/components/header';
import Link from 'next/link';

export default function notFoundPage() {
  return (
    <div className={style.container}>
        <Header />
        <div className={style.content}>
            <div className={style.wrap}>
                <div className={style.not_page}>
                    <h2>다시 한번 확인해 주세요!</h2>
                    <p>지금 입력하신 주소의 페이지는 삭제되었거나 다른 페이지로 변경되었습니다.<br />주소를 다시 확인해 주세요.</p>
                    <div className={style.btn}>
                        <Link href={'/main'}>
                            메인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}