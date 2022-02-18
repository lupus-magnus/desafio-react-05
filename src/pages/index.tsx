import { GetStaticProps } from 'next';
import { FiUser, FiCalendar } from 'react-icons/fi';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../services/prismic';
// import commonStyles from '../styles/common.module.scss';

import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const { next_page, results } = postsPagination;
  return (
    <>
      <Header />
      <main className={styles.main}>
        <ul>
          {results.map(post => (
            <li>
              <a href={`/post/${post.uid}`}>
                <header>{post.data.title}</header>
                <p>{post.data.subtitle}</p>
                <footer>
                  <time>
                    <FiCalendar />
                    {post.first_publication_date}
                  </time>
                  <span>
                    <FiUser /> {post.data.author}
                  </span>
                </footer>
              </a>
            </li>
          ))}
        </ul>
        {next_page && <a href="/">Carregar mais posts</a>}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.body', 'post.author', 'post.subtitle'],
      pageSize: 3,
    }
  );

  // console.log(JSON.stringify(postsResponse, null, 2));

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
  // console.log('my posts:', posts);
  return {
    props: {
      postsPagination: {
        results: posts,
        next_page: next_page ?? '',
      },
    },
  };
};
