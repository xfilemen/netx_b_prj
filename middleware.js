import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
//import {getBoardInfo} from '/lib/dao.js';
//import {authOptions} from '/lib/auth-config.js';
//import { getServerSession } from 'next-auth';
//import middleware from "next-auth/middleware";


export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || 'pmds-bteam' }) || {};
  const { pathname } = request.nextUrl;
  // 인증이 필요한 페이지 경로
  const protectedPages = ['/detail', '/test', '/main','/board']; // 접근 제한 화면
  const ignoreApi = ['/api/req', 'api/detail']; // 접근 제한 api

  // 게시물 list , regist
  const match1 = pathname.match(/^\/board\/([^\/]+)\/(list|regist)$/);  
  if(match1){
    let brdId1 = match1[1];
    console.log(`brdId: ${brdId1}`);
    //let tbBoard = getBoardInfo(brdId1);
    console.log('boardInfo',tbBoard);
  }

  // 게시물 detail , modify
  const match2 = pathname.match(/^\/board\/([^\/]+)\/post\/([^\/]+)\/(detail|modify)$/);
  if(match2){
    const brdId = match2[1];
    const pstId = match2[2];
    console.log(`brdId: ${brdId}, pstId: ${pstId}`);
  }


  // 로그인 페이지 접근 시 세션 초기화
  if (pathname === '/user/login') {
    const response = NextResponse.next();
    response.cookies.set('next-auth.session-token', '', { maxAge: -1 });
    return response;
  }
  console.log('Request URL:', pathname); // 요청 URL 출력
  console.log('Auth Token:', token); // 토큰 값 출력


  if (pathname === '/') {
    if (token.user) {
      return NextResponse.redirect(new URL('/main', request.url));
    } else {
      return NextResponse.redirect(new URL('/user/login', request.url));
    }
  }

  if (!token.user) {
    if (protectedPages.some(api => pathname.includes(api))) {
      return NextResponse.redirect(new URL('/user/login', request.url));
    }

    if (ignoreApi.some(api => pathname.includes(api))) {
      return new NextResponse(JSON.stringify({ message: '세션이 만료되었습니다.' }), { status: 440 });
    }
  }

  return NextResponse.next();
}

// export default middleware({
//     pages: {
//         signIn: '/user/login',
//       },
//     callbacks: {
//     authorized: ({ req, token }) => {
//         if (!token){
//             console.log('토큰값 없음');
//             return new NextResponse(
//                 JSON.stringify({ message: 'Unauthorized' }), 
//                 {
//                   status: 401, // 401 상태 코드
//                   headers: { 'Content-Type': 'application/json' }, 
//                 }
//               );
//         }
//         console.log('token',token);

//         return true; // 기본적으로 false 반환
//     },
//     },
//   });
// // 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    '/'
    ,'/user/login'
    ,'/main/:path*'
    ,'/notice/:path*'
    ,'/detail/:path*'
    ,'/board/:path*'
    ,'/api/req/:path*'
    ,'/api/brd/:path*'
  ]
};
