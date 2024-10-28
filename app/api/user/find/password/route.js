import prisma from '/lib/prisma';
export async function POST(req) {
  try {

    const data = await req.json();
    if(data.params){
      const { userId, seq, userPwd, pwdWrongCnt, modId } = data.params;

      const updatedTbLogin = await prisma.tbLogin.update({
        where: { 
          userId: userId 
        },
        data: {
          userPwd,
          modId,
          modDt: new Date()
        },
      });

      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : 'success'}), {
        status: 200,
      })

    }else{
      throw new Error('param null');
    }
    // const { cj_id, password } = data;
    // console.log(cj_id, password );
    
  } catch(err){
    console.log(err);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: 401,
    })
  } finally {
    await prisma.$disconnect();
  }

}