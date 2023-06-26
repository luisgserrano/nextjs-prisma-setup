import prisma from '@/prisma/client';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany();
        return res.status(200).json(posts);
      } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching posts.' });
      }

    case 'POST':
      try {
        const { title, content } = req.body;
        const post = await prisma.post.create({
          data: {
            title,
            content,
            published: true,
          },
        });
        return res.status(201).json(post);
      } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating a post.' });
      }

    default:
      return res.status(405).end(); // Method Not Allowed
  }
};
