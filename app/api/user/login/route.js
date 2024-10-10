import prisma from '/lib/prisma';

export async function POST(req) {
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

  } else if (getUser[0].password !== password) {
    return new Response(JSON.stringify({ message: '패스워드 불일치' }), {
      status: 401,
    })

  }


  return new Response(JSON.stringify({ message: '로그인 성공' }), {
    status: 200,
  })

}