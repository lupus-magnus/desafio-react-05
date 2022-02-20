import { useState } from 'react';
import { GetStaticProps } from 'next';
import { FiUser, FiCalendar } from 'react-icons/fi';
// import Prismic from '@prismicio/client';
import Link from 'next/link';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// import { getPrismicClient } from '../services/prismic';
// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import { getPosts, getPostsClientSide } from '../api/posts/getPosts';

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
  const [nextPage, setNextPage] = useState(next_page);
  const [postsInDisplay, setPostsInDisplay] = useState(results);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const handleFetchMorePosts = async (): Promise<void> => {
    if (nextPage) {
      setLoadingPosts(true);
      const { data: newPosts, next_page: newNextPage } =
        await getPostsClientSide(nextPage);

      setPostsInDisplay(prev => [...prev, ...newPosts]);
      setNextPage(newNextPage);
      setLoadingPosts(false);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <ul>
          {postsInDisplay.map(post => (
            <li>
              <Link href={`/post/${post.uid}`}>
                <a>
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
              </Link>
            </li>
          ))}
        </ul>
        {nextPage && (
          <button
            disabled={loadingPosts}
            onClick={handleFetchMorePosts}
            type="button"
          >
            Carregar mais posts {loadingPosts && <AiOutlineLoading3Quarters />}
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: posts, next_page } = await getPosts();
  return {
    props: {
      postsPagination: {
        results: posts,
        next_page: next_page ?? '',
      },
    },
  };
};
