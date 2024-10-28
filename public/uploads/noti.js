import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // formidable을 사용하려면 bodyParser를 비활성화해야 함
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads'; // 업로드 디렉토리 설정
    form.keepExtensions = true; // 파일 확장자 유지

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: '파일 업로드 실패' });
      }

      const { title, content, date, author } = fields;
      const file = files.file;

      let filePath = null;
      if (file) {
        filePath = `/uploads/${file.newFilename}`; // 파일 경로
        fs.renameSync(file.filepath, `./public${filePath}`);
      }

      // 데이터베이스에 저장 (이 예시에서는 파일 경로와 함께 저장)
      const notice = {
        title,
        content,
        date,
        author,
        filePath, // 파일 경로를 함께 저장
      };

      // MongoDB 등의 데이터베이스에 저장하는 로직 필요
      // 예: await db.collection('notices').insertOne(notice);

      res.status(200).json({ message: '공지사항이 등록되었습니다.', notice });
    });
  } else {
    res.status(405).json({ message: '지원하지 않는 메서드입니다.' });
  }
};

export default handler;