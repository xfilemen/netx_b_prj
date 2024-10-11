import prisma from '/lib/prisma';
import bcryptObj from "/lib/bcrypt";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_KEY = process.env.JWT_KEY || '';

export async function POST(req,res) {
  const data = await req.json();
  const { cj_id, password } = data;
  console.log(cj_id, password );

  const getUser = await prisma.user.findMany({
    where: {
      cj_id: cj_id 
    }
  })

  console.log(getUser)

  if(getUser.length == 0){
    return new Response(JSON.stringify({ message: '존재하지 않는 계정' }), {
      status: 401,
    })

  } else if (!bcryptObj.compare(password,getUser[0].password)) {
    return new Response(JSON.stringify({ message: '패스워드 불일치' }), {
      status: 401,
    })
  }


  // JWT 토큰 생성
  const token = jwt.sign(
    { id: getUser[0].cj_id, email: getUser[0].email }, // 페이로드에 사용자 ID와 이메일 포함
     JWT_KEY, // 비밀 키
    { expiresIn: '1h' } // 토큰 만료 시간 설정
  );
  try {
    console.log(token);
    console.log(typeof token);
    jwt.verify(token, JWT_KEY);
    console.log('토큰 일치');
  } catch (error) {
    console.log('토큰 불일치');
  }


  cookies().set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60, // 1시간
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  // res.headers.set('Set-Cookie', cookie.serialize('accessToken', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 60 * 60, // 1시간
  //   sameSite: 'lax',
  //   path: '/',
  // }));




  return new Response(JSON.stringify({ message: '로그인 성공',token }), {
    status: 200,
  })   


}