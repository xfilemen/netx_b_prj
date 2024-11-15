import prisma from "/lib/prisma";
import { getSession } from "/utils/data-access";
/**
 * @swagger
 * /req/list:
 *   post:
 *     tags:
 *       - request
 *     summary: 요청 내역 조회
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *     responses:
 *       200:
 *         description: 요청 내역 조회. 요청자일때는 본인 요청 내역만 가져오고 승인자일 경우 전체 내역 가져옴
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const { params } = await req.json();
    const data = params?.data || params;
    const { user } = await getSession();

    let { reqStatus, startRegDt, endRegDt, reqType, selectType, reqTypeText } =
      data;

    // 필터 정보
    let where = {};

    // 진행 상태
    if (reqStatus.length > 0 && !reqStatus.includes("all")) {
      where.reqStatus = {
        in: reqStatus, // reqStatus 리스트 내의 값 중 하나와 일치하는 데이터 조회
      };
    }

    // 기간
    if (startRegDt && endRegDt) {
      let nextEndRegDt = new Date(endRegDt);
      nextEndRegDt.setDate(nextEndRegDt.getDate() + 1);

      where.regDt = {
        gte: new Date(startRegDt), // startRegDt와 같거나 이후 날짜
        lte: nextEndRegDt, // endRegDt와 같거나 이전 날짜
      };
    }

    // 유형
    if (reqType.length > 0 && !reqType.includes("all")) {
      const orConditions = reqType.map((type) => ({
        reqType: type,
      }));
      where.reqDet = {
        some: {
          OR: orConditions,
        },
      };
    }
    if (reqType.length > 0 && reqType.includes("all")) {
      where.reqDet = {
        some: {
          reqType: reqType
            .filter((type) => type !== "all")
            .sort((type) => (type === "정규직" ? -1 : 1))
            .join(", "),
        },
      };
    }

    // 선택 내용
    if (selectType && selectType.trim()) {
      if (selectType == "업무명") {
        where.reqTitle = {
          contains: reqTypeText, // reqTitle의 LIKE 검색
        };
      }

      if (selectType == "요청자명" || selectType == "담당자명") {
        const getUser = await prisma.tbUser.findMany({
          where: {
            userName: reqTypeText,
          },
          select: {
            userId: true,
          },
        });

        if (getUser.length > 0) {
          const ids = getUser.map((user) => user.userId);

          if (selectType == "요청자명") where.regId = { in: ids };
          if (selectType == "담당자명") where.confId = { in: ids };
        } else {
          // 결과값 없으면 조회 안되게
          if (selectType == "요청자명") where.regId = reqTypeText;
          if (selectType == "담당자명") where.confId = reqTypeText;
        }
      }
    }

    //요청자일 때는 본인 요청내역만 조회
    if (user.authCd == "request") {
      where.regId = user.userId;
    }

    const tbReqMgt = await prisma.tbReqMgt.findMany({
      where,
      include: {
        reqDet: true,
      },
      orderBy: {
        regDt: "desc",
      },
    });
    return new Response(
      JSON.stringify({ message: "정상적으로 조회되었습니다.", data: tbReqMgt }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "오류 발생" }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}
