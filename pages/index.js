// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import styles from './styles/main.module.css';
// import Image from 'next/image';

// export default function LoginPage() { 
//   return (
//     <div className={styles.container}>
//       <div className={styles.loginbg}>
//         <Link href="/detail" onclick="">
//           <Image 
//             src="/images/login/loginbg.png"
//             alt="로그인 페이지"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>홈 페이지</h1>
      <Link href={'/pages/detail'}>소개 페이지로 이동</Link>
    </div>
  );
}