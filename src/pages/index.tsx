import { GetStaticProps } from 'next';

import { FiUser, FiCalendar } from 'react-icons/fi';
// import { getPrismicClient } from '../services/prismic';

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

export default function Home(): JSX.Element {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <ul>
          <li>
            <a>
              <header>Como utilizar hooks</header>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                dignissimos magni earum rerum distinctio hardadpo awkdo p
              </p>
              <footer>
                <time>
                  <FiCalendar />
                  19 de abril
                </time>
                <span>
                  <FiUser />O Grande Deus Lobo
                </span>
              </footer>
            </a>
          </li>
          <li>
            <a>
              <header>Como utilizar hooks</header>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                dignissimos magni earum rerum distinctio hardadpo awkdo p
              </p>
              <footer>
                <time>
                  <FiCalendar /> 19 de abril
                </time>
                <span>
                  <FiUser /> O Grande Deus Lobo
                </span>
              </footer>
            </a>
          </li>
        </ul>
        <a href="/">Carregar mais posts</a>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
