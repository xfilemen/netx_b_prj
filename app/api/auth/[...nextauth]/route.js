import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '/lib/prisma';
import bcryptObj from "/lib/bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cj_id: { label: 'CJWORLD ID', type: 'text', placeholder: 'CJWORLD ID를 입력해 주세요.' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const getUser = await prisma.tbUser.findMany({
          where: {
            userId: credentials.cj_id 
          }
        })

        console.log(getUser)

        if(getUser.length == 0){
          throw new Error("존재하지 않는 계정");

        } 
        /*
        const maxSeq = await prisma.TBLogin.aggregate({
          _max: {
            seq: true,
          },
          where: {
            userId: credentials.cj_id
          },
        });
        */
        const getPwd = await prisma.tbLogin.findMany({
          where: {
            userId: credentials.cj_id 
          }
        })

        if (!bcryptObj.compare(credentials.password,getPwd[0].userPwd)) {
          throw new Error("패스워드 불일치");

        }
        const user = { userId: getUser[0].userId,  
                       userName: getUser[0].userName, 
                       deptName:getUser[0].deptName, 
                       compCd:getUser[0].compCd }
      
        return user;
      }
    })
  ],
  pages: {
    signIn: '/user/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, // (초 단위: 60초 * 60분 * 24시간 * 7일)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
          token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
          session.user = token.user;
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
