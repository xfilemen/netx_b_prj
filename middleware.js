import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || 'pmds-bteam' }) || {};

  // 인증이 필요한 페이지 경로
  const protectedPages = ['/detail', '/test', '/main']; // 접근 제한 화면
  const ignoreApi = ['/api/req', 'api/detail']; // 접근 제한 api

  // 로그인 페이지 접근 시 세션 초기화
  if (request.nextUrl.pathname === '/user/login') {
    const response = NextResponse.next();
    response.cookies.set('next-auth.session-token', '', { maxAge: -1 });
    return response;
  }

  if (request.nextUrl.pathname === '/') {
    if (token.user) {
      return NextResponse.redirect(new URL('/main', request.url));
    } else {
      return NextResponse.redirect(new URL('/user/login', request.url));
    }
  }

  console.log('Request URL:', request.nextUrl.pathname); // 요청 URL 출력
  console.log('Auth Token:', token); // 토큰 값 출력

  if (!token.user) {
    if (protectedPages.some(api => request.nextUrl.pathname.includes(api))) {
      return NextResponse.redirect(new URL('/user/login', request.url));
    }

    if (ignoreApi.some(api => request.nextUrl.pathname.includes(api))) {
      return new NextResponse(JSON.stringify({ message: '세션이 만료되었습니다.' }), { status: 401 });
    }
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ['/', '/user/login', '/main/:path*', '/detail/:path*', '/api/req/:path*'] // 특정 경로에만 미들웨어 적용
};
