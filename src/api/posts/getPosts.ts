import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';

type PostType = {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
};

type PostsDataType = {
  data: PostType[];
  next_page: string | null;
};

export const getPosts = async (page?: number): Promise<PostsDataType> => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.body', 'post.author', 'post.subtitle'],
      pageSize: 3,
      page: page ?? 1,
    }
  );

  const { results, next_page } = postsResponse;
  const posts = results.map(item => ({
    uid: item.uid,
    data: {
      title: item.data.title,
      subtitle: item.data.subtitle,
      author: item.data.author,
    },
    first_publication_date: new Date(
      item.first_publication_date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { data: posts, next_page };
};

export const getPostsClientSide = async (
  page: string
): Promise<PostsDataType> => {
  try {
    const regex = /&page=\d/;
    const [capturedGroup] = page.match(regex);
    if (capturedGroup) {
      const wantedPage = capturedGroup.charAt(capturedGroup.length - 1);

      const response = await fetch(`/api/posts/?page=${wantedPage}`);

      const { data, next_page } = (await response.json()) as {
        data: PostType[];
        next_page: string | null;
      };
      return { data, next_page };
    }
    return { data: [], next_page: null };
  } catch {
    return { data: [], next_page: null };
  }
};
