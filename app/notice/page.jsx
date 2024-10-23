import styles from '/app/styles/notice.module.css';
import Image from 'next/image';

export const metadata = {
  title: '인력요청시스템',
};

const notices = [
  { id: 1, title: '사이트 점검 안내', author: '관리자', date: '2024-10-23' },
  { id: 2, title: '새로운 기능 업데이트', author: '개발팀', date: '2024-10-20' },
  { id: 3, title: '서비스 이용약관 변경 안내', author: '법무팀', date: '2024-10-18' },
];

const NoticeItem = ({ notice }) => (
  <div className={styles.noticeItem}>
    <div>{notice.id}</div>
    <div>{notice.title}</div>
    <div>{notice.date}</div>
    <div>{notice.author}</div>
  </div>
);

const NoticeBoard = () => (
  <div className={styles.noticeBoard}>
    <div className={styles.noticeHeader}>
      <div>No.</div>
      <div>제목</div>
      <div>게시일</div>
      <div>등록자</div>
    </div>
    {notices.map((notice) => (
      <NoticeItem key={notice.id} notice={notice} />
    ))}
  </div>
);

export default function NotiPage() { 
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
        <h2>공지사항</h2>
        <NoticeBoard />
      </div>
    </div>
  );
}