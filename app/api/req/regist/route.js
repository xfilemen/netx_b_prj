import prisma from '/lib/prisma';
import {getObjTrimAndNullProc} from '/utils/common-util';
import {getSession} from '/utils/data-access';
export async function POST(req) {
  try {
    const data = await req.json();
    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);
    const {user} = await getSession();

    if(data.params.data){
      const procData = getObjTrimAndNullProc(data.params.data);
      const { reqTitle, reqName, reqOrd, reqStatus, reqType, reqPurp, reqDet, reqHeadcount} = procData;

      const tbReqMgt = await prisma.tbReqMgt.create({
        data: {
          reqTitle,
          reqName,
          reqOrd,
          reqStatus,
          reqType,
          reqPurp,
          reqHeadcount,
          regId : user.userId,
          regDt : nowData
        },
      });

      // 상세
      for(let i in reqDet){
        const procData = getObjTrimAndNullProc(reqDet[i]);
        let { reqType, reqHeadcount, reqJob, reqJobDet, reqGrade, 
              reqInDt, reqOutDt, reqMm, reqLoc, reqSkill } = procData;

        let createdTbReqMgtDet = await prisma.tbReqMgtDet.create({
          data: {
            reqId : tbReqMgt.reqId,
            reqType,
            reqHeadcount,
            reqJob,
            reqJobDet,
            reqGrade,
            reqInDt,
            reqOutDt,
            reqMm,
            reqLoc,
            reqSkill,
            regId : user.userId,
            regDt : nowData
          },
        });
        reqDet[i].reqDetId = createdTbReqMgtDet.reqDetId;
      }
      
      tbReqMgt.reqDet = reqDet;


      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : tbReqMgt}), {
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