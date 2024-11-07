// swaggerOptions.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: '인력 요청 시스템 API 명세서',
      version: '1.0.0',
      description: 'next.js 기반 API ',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // 기본 서버 URL 설정
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    // API 주석이 포함된 파일 경로 설정
    apis: ['./app/api/**/**/*.js', './app/api/**/**/**/*.js', './app/api/**/**/**/**/*.js'], // 경로는 프로젝트 구조에 맞게 조정
  };
  
  export default options;
  