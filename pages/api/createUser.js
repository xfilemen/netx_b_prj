import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, age } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          age: parseInt(age),
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'User creation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}