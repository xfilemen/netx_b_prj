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
        const getUser = await prisma.user.findMany({
          where: {
            cj_id: credentials.cj_id 
          }
        })

        console.log(getUser)

        if(getUser.length == 0){
          throw new Error("존재하지 않는 계정");

        } else if (!bcryptObj.compare(credentials.password,getUser[0].password)) {
          throw new Error("패스워드 불일치");

        }
        const user = { id: getUser[0].id,  
                       name: getUser[0].name, 
                       email:getUser[0].email, 
                       age:getUser[0].age, 
                       username: credentials.cj_id }
      
        return user;
      }
    })
  ],
  pages: {
    signIn: '/user/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, // 7일 동안 세션 유지 (초 단위: 60초 * 60분 * 24시간 * 7일)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id 
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session;
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
