# 환경설정 가이드

### 설치 및 빌드 가이드
1. https://nodejs.org/en <- 홈페이지 접속하여 .msi 파일 다운로드 후 설치 (node v20 이상)
2. https://code.visualstudio.com/download <- vscode 윈도우 버전 다운로드 후 설치
2. vscode 실행 후 왼쪽 네비게이션 아이콘중  source Control 클릭
3. Clone Repository 클릭
4. 상단 입력창 표시되면 https://github.com/{git주소}/nextjs.git 입력후 enter
5. 로컬 폴더에 프로젝트 생성 완료 되면 vscode 상단에 Terminal -> new Terminal 클릭
6. 하단에 터미널창 오픈 되면 순서대로 입력
   - npm install -g npm
   - npm install prisma --save-dev
   - npm install @prisma/client
   - npx prisma generate
   - npm install next-auth
   - npm install axios
   - npm i env-cmd
   - npx next build
   - npx next start (수정 작업중에는 npm run dev 입력)
7. 브라우저에서 기본 주소 http://localhost:3000/ 실행

