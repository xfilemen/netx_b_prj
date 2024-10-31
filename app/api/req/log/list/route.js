import prisma from '/lib/prisma';
export async function POST(req) {
  try {
    const {param} = await req.json();

    if(param){
      const tbReqMgtLog = await prisma.tbReqMgtLog.findMany({
        where: { 
            reqId : param.reqId
        },
        orderBy: {
          regDt: 'desc',
        },
      })
      return new Response(JSON.stringify({ message: '정상적으로 조회되었습니다.', data : tbReqMgtLog}), {
        status: 200,
      })
    }else{
      throw new Error('param null');
    }
  } catch(err){
    console.log(err);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: 401,
    })
  } finally {
    await prisma.$disconnect();
  }

}