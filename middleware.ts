import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // 쿠키에서 인증 토큰 확인

  // 인증이 필요한 페이지 경로
  const protectedPages = ['/notice', '/file'];

  const replaceTerms = ["/board", "/write", "/list"];

  // 정규식 생성  
  const regex = new RegExp(replaceTerms.join("|"), "gi"); 

  const board_id = (request.nextUrl.pathname).replace(regex,'');


  console.log('Request URL:', request.nextUrl.pathname);  // 요청 URL 출력
  console.log('board id:', board_id);  // 요청 URL 출력
  console.log('Auth Token:', token);  // 토큰 값 출력

  /*
  if (!protectedPages.includes(board_id)) {
      return new NextResponse(null, { status: 404 }); // 404 상태 코드 반환
  }
  */
  return NextResponse.next(); // 요청을 그대로 통과시킴
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ['/main/:path*', '/detail/:path*'], // 특정 경로에만 미들웨어 적용
};