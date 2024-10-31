import prisma from '/lib/prisma';
export async function POST(req) {
  try {
    
    const data = await req.json();
    //console.log(data);

    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);

    if(data.params){
      const { reqLogDesc, regId } = data.params;

      const tbReqMgtLog = await prisma.tbReqMgtLog.create({
        data: {
          reqLogDesc,
          regId,
          regDt : nowData
        },
      });

      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : tbReqMgtLog}), {
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