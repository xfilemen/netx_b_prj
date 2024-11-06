import styles from '@styles/complete.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function completePage() {
  return (
    <div className={styles.content}>
       <div className={styles.topbanner}>
            <Image 
                src="/images/detail/TopVisual.png"
                alt="효율적인 인력배치 언제든 문의하세요"
                width={1440}
                height={150}
            />
        </div>
        <div className={styles.wrap}>
            <Image 
                src="/images/detail/ico_partners.png"
                alt=""
                width={88}
                height={88}
                className={styles.ico_img}
            />
            <p className={styles.p_tx}>인력 요청이 완료되었습니다.<br/>담당자 배정 후 진행 현황을 확인해 주세요.</p>
            <div className={styles.btn_section}>
                <Link href={'/main'} className={styles.main_btn}>메인 이동</Link>
                <Link href={'/detail'} className={styles.req_list_btn}>요청 내역</Link>
            </div>
        </div>
    </div>
  )
}