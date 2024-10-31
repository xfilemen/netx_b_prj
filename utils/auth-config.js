
export const authConfig = {
  pages: {
    signIn: '/user/login'
  },
  secret: process.env.NEXTAUTH_SECRET || "pmds-bteam",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, // (초 단위: 60초 * 60분 * 1시간)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // token.userId = user.userId;
        // token.userName = user.userName; 
        // token.deptName = user.deptName;
        // token.compName = user.compName; 
        // token.authCd = user.authCd; 
        // token.authName = user.authName; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        // session.user.id = token.userId; 
        // session.user.name = token.userName; 
        // session.user.deptName = token.deptName; 
        // session.user.compName = token.compName;
        // session.user.authCd = token.authCd;
        // session.user.authName = token.authName;
      }
      return session;
    }
  },
  providers: []
};