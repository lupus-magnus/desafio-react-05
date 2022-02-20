import { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../api/posts/getPosts';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { page } = req.query;
  const posts = await getPosts(page ? Number(page) : undefined);
  res.json(posts);
};
