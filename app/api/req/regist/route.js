import prisma from '/lib/prisma';
export async function POST(req) {
  try {
    
    const data = await req.json();
    //console.log(data);

    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);

    if(data.params.main){
      const { reqTitle, reqName, reqOrd, reqStatus, reqType, reqPurp, regId, reqDet} = data.params.main;

      const tbReqMgt = await prisma.tbReqMgt.create({
        data: {
          reqTitle,
          reqName,
          reqOrd,
          reqStatus,
          reqType,
          reqPurp,
          regId,
          regDt : nowData
        },
      });

      console.log(tbReqMgt);

      // 상세
      for(let i in reqDet){
        console.log(i);
        let { reqType, reqHeadcount, reqJob, reqJobDet, reqGrade, 
              reqInDt, reqOutDt, reqMm, reqLoc, reqSkill, regId } = reqDet[i];

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
            regId,
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