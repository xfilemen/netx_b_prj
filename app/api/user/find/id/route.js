import prisma from '/lib/prisma';
export async function POST(req) {
  try {

    const data = await req.json();
    if(data.params){
      const { userId, compCd, deptName, userName } = data.params;

      const getUser = await prisma.tbUser.findMany({
        where: {
            userId: userId ,
        }
      });

      console.log(getUser);
      if(getUser.length > 0){
          return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : getUser}), {
            status: 200,
          })
      }else {
          return new Response(JSON.stringify({ message: '존재하지 않는 계정입니다.', data : getUser}), {
            status: 200,
          })
      }
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