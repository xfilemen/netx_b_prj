import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, email, age } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email, age: parseInt(age) },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'User update failed' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}