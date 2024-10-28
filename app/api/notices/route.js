import { fetchNoticesFromDB } from '../../lib/db'; // DB에서 데이터를 가져오는 로직

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const notices = await fetchNoticesFromDB();
    res.status(200).json(notices);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}