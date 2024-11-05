import { notFound } from 'next/navigation';
import styles from '@styles/notice.module.css';
import Image from 'next/image';
import Link from 'next/link';

const notices = [
    { 
        id: 1, 
        title: '시스템 점검 공지', 
        date: '2024-10-23', 
        author: '이민호', 
        content: '2024년 10월 25일에 예정된 시스템 점검으로 인해 서비스 이용이 일시적으로 중단됩니다.<br>불편을 드려 죄송합니다.'
    },
    { 
        id: 2, 
        title: '신규 기능 릴리즈 안내', 
        date: '2024-10-20', 
        author: '박지민', 
        content: '새로운 기능이 릴리즈되었습니다.<br>해당 기능은 사용자 편의성을 향상시키기 위한 업데이트입니다.'
    },
    { 
        id: 3, 
        title: '이용약관 변경 알림', 
        date: '2024-10-18', 
        author: '최수영', 
        content: '2024년 11월 1일부터 적용되는 새로운 이용약관을 확인해주시기 바랍니다.<br>주요 변경 사항은 개인정보 처리방침과 관련된 내용입니다.'
    },
    { 
        id: 4, 
        title: '보안 패치 적용 안내', 
        date: '2024-10-16', 
        author: '정다희', 
        content: '보안 취약점을 해결하기 위한 패치가 적용되었습니다.<br>사용자 여러분께서는 최신 보안 업데이트를 적용해주시기 바랍니다.'
    },
    { 
        id: 5, 
        title: '서버 증설 작업 공지', 
        date: '2024-10-14', 
        author: '김영준', 
        content: '2024년 10월 15일에 서버 증설 작업이 진행됩니다.<br>서비스 중단 시간은 오후 2시부터 4시까지입니다.'
    },
    { 
        id: 6, 
        title: '기능 개선 업데이트', 
        date: '2024-10-12', 
        author: '서지은', 
        content: '사용자 피드백을 반영하여 여러 기능을 개선하였습니다.<br>주요 변경 사항은 사용자 인터페이스 개선입니다.'
    },
    { 
        id: 7, 
        title: '정기 점검 일정 안내', 
        date: '2024-10-10', 
        author: '최하나', 
        content: '정기 점검이 2024년 10월 13일에 진행됩니다.<br>서비스 중단 시간은 오전 9시부터 12시까지입니다.'
    },
    { 
        id: 8, 
        title: '서비스 장애 복구 공지', 
        date: '2024-10-08', 
        author: '장민수', 
        content: '지난 10월 7일 발생한 서비스 장애가 복구되었습니다.<br>불편을 드려 죄송하며, 향후 같은 문제가 발생하지 않도록 노력하겠습니다.'
    },
    { 
        id: 9, 
        title: '모바일 앱 업데이트', 
        date: '2024-10-06', 
        author: '오지훈', 
        content: '모바일 앱이 새롭게 업데이트되었습니다.<br>최신 버전으로 업데이트하여 더 나은 사용자 경험을 즐기시기 바랍니다.'
    },
    { 
        id: 10, 
        title: '사용자 설문 조사 참여 요청', 
        date: '2024-10-04', 
        author: '김수정', 
        content: '더 나은 서비스를 제공하기 위해 사용자 설문 조사를 진행 중입니다.<br>많은 참여 부탁드립니다.'
    },
    { 
        id: 11, 
        title: '새로운 테마 추가 안내', 
        date: '2024-10-02', 
        author: '이준호', 
        content: '새로운 테마가 추가되었습니다.<br>설정에서 새로운 테마를 적용해보세요.'
    },
    { 
        id: 12, 
        title: '개인정보 처리 방침 변경', 
        date: '2024-09-30', 
        author: '윤혜진', 
        content: '2024년 10월 15일부터 개인정보 처리 방침이 변경됩니다.<br>자세한 내용은 공지사항을 확인해주세요.'
    },
    { 
        id: 13, 
        title: '사용자 계정 보호 강화', 
        date: '2024-09-28', 
        author: '최재훈', 
        content: '사용자 계정 보호를 위한 강화된 보안 정책이 적용되었습니다.<br>계정 보호를 위해 주기적으로 비밀번호를 변경해주세요.'
    },
    { 
        id: 14, 
        title: '신규 기능 릴리즈 안내', 
        date: '2024-10-20', 
        author: '박지민', 
        content: '새로운 기능이 릴리즈되었습니다.<br>사용자의 피드백을 기반으로 기능이 추가되었습니다.'
    },
    { 
        id: 15, 
        title: '이용약관 변경 알림', 
        date: '2024-10-18', 
        author: '최수영', 
        content: '이용약관이 변경되었습니다.<br>새로운 약관은 2024년 11월 1일부터 시행됩니다.'
    },
    { 
        id: 16, 
        title: '보안 패치 적용 안내', 
        date: '2024-10-16', 
        author: '정다희', 
        content: '이번 패치는 보안 문제를 해결하기 위한 필수 패치입니다.<br>최신 버전으로 업데이트해 주세요.'
    },
    { 
        id: 17, 
        title: '서버 증설 작업 공지', 
        date: '2024-10-14', 
        author: '김영준', 
        content: '서버 증설 작업으로 인한 서비스 중단이 있을 예정입니다.<br>양해 부탁드립니다.'
    },
    { 
        id: 18, 
        title: '기능 개선 업데이트', 
        date: '2024-10-12', 
        author: '서지은', 
        content: '서비스 사용성을 개선하기 위한 기능 업데이트가 이루어졌습니다.'
    },
    { 
        id: 19, 
        title: '정기 점검 일정 안내', 
        date: '2024-10-10', 
        author: '최하나', 
        content: '정기 점검이 예정되어 있습니다. 점검 시간 동안 서비스가 일시적으로 중단됩니다.'
    },
    { 
        id: 20, 
        title: '서비스 장애 복구 공지', 
        date: '2024-10-08', 
        author: '장민수', 
        content: '서비스 장애가 복구되었습니다. 불편을 드려 죄송합니다.'
    },
    { 
        id: 21, 
        title: '모바일 앱 업데이트', 
        date: '2024-10-06', 
        author: '오지훈', 
        content: '모바일 앱의 기능이 개선되었습니다.<br>최신 버전으로 업데이트하여 새로운 기능을 사용해보세요.'
    },
    { 
        id: 22, 
        title: '사용자 설문 조사 참여 요청', 
        date: '2024-10-04', 
        author: '김수정', 
        content: '사용자 설문 조사를 통해 더 나은 서비스를 제공하기 위한 데이터를 수집 중입니다.<br>많은 참여 부탁드립니다.'
    },
    { 
        id: 23, 
        title: '새로운 테마 추가 안내', 
        date: '2024-10-02', 
        author: '이준호', 
        content: '새로운 테마가 추가되었습니다.<br>테마 변경은 설정에서 가능합니다.'
    },
    { 
        id: 24, 
        title: '개인정보 처리 방침 변경', 
        date: '2024-09-30', 
        author: '윤혜진', 
        content: '개인정보 처리 방침이 2024년 10월 15일부터 변경될 예정입니다.<br>세부 사항은 공지사항을 확인해주세요.'
    },
    { 
        id: 25, 
        title: '사용자 계정 보호 강화', 
        date: '2024-09-28', 
        author: '최재훈', 
        content: '계정 보호를 위해 보안 정책이 강화되었습니다.<br>비밀번호를 주기적으로 변경하는 것을 권장합니다.'
    },
    { 
        id: 26, 
        title: '신규 기능 릴리즈 안내', 
        date: '2024-10-20', 
        author: '박지민', 
        content: '새로운 기능이 추가되었습니다.<br>업데이트 내용을 확인해주세요.'
    },
];

const NoticeDetail = ({ params }) => {
  const { id } = params;
  const notice = notices.find((item) => item.id === parseInt(id));

  if (!notice) {
    return notFound();
  }

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
        <div className={styles.noti_detail}>
            <div className={styles.header}>
                <h3>{notice.title}</h3>
                <div className={styles.detail_info}>
                    <span>게시일 : {notice.date}</span>
                    <span>등록자 : {notice.author}</span>
                </div>
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: notice.content }} />
            <div className={styles.btn_section}>
                <Link href={'/notice'} className={styles.btn_list_page}>목록</Link>
                <button>수정</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;