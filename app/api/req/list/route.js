import prisma from '/lib/prisma';
import {getSession} from '/utils/data-access';
export async function POST(req) {
  try {
    const {user} = await getSession();

    let where = {}
    //요청자일 때는 본인 요청내역만 조회
    if(user.authCd == 'request'){
      where = { 
          regId : user.userId
      }
    }

    const tbReqMgt = await prisma.tbReqMgt.findMany({
      where,
      include: {
        reqDet: true,
      },
      orderBy: {
        regDt: 'desc',
      },
    })

    return new Response(JSON.stringify({ message: '정상적으로 조회되었습니다.', data : tbReqMgt}), {
      status: 200,
    })
  } catch(err){
    console.log(err);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: 401,
    })
  } finally {
    await prisma.$disconnect();
  }

}