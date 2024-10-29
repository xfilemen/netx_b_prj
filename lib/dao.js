import prisma from './prisma';

const getComCode = async (param) => {
    return null;
};

const getBoardInfo = async (param) => {
    try {
        const tbBoard = await prisma.tbBoard.findMany({
            where: {
                brdId: param,
                useYn : 'Y'
            }
        })

        return tbBoard;

      } catch(err){
        console.log(err);
        return null;

      } finally {
        await prisma.$disconnect();

      }
};
  
export default {getComCode,getBoardInfo};