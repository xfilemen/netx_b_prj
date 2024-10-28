import prisma from '/lib/prisma';
export async function POST(req) {
  try {
    const data = await req.json();

    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);

    if(data.params.main){
      const { reqId, reqTitle, reqName, reqOrd, reqStatus, reqType, reqPurp,reqDet, modId } = data.params.main;
      const updatedTbReqMgt = await prisma.tbReqMgt.update({
        where: { reqId },
        data: {
          reqTitle,
          reqName,
          reqOrd,
          reqStatus,
          reqType,
          reqPurp,
          modId,
          modDt: nowData, // Set the modification date to now
        },
      });

      // 상세
      for(let i in reqDet){
        let { reqId, reqDetId, reqType, reqHeadcount, reqJob, reqJobDet, reqGrade, 
              reqInDt, reqOutDt, reqMm, reqLoc, reqSkill, modId } = reqDet[i];
        console.log(reqId,reqDetId);

        let updatedTbReqMgtDet = await prisma.tbReqMgtDet.update({
          where: { reqId_reqDetId: { reqId, reqDetId } },
          data: {
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
            modId, 
            modDt: new Date(), // Set the modification date to now
          },
        });

      }

      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : updatedTbReqMgt}), {
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