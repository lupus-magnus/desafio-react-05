import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import Header from '../../components/Header';
// import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post(): JSX.Element {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <img
            className={styles.postImage}
            src="/images/mock-hero.jpg"
            alt="a work desk"
          />
        </div>

        <article className={styles.article}>
          <header>
            <h1>Oportunidades internacionais em programação</h1>
            <span>
              <time>
                <FiCalendar /> 4 de maio
              </time>
              <span>
                <FiUser /> Matheus Cardoso
              </span>
              <time>
                <FiClock /> 4 minutos
              </time>
            </span>
          </header>

          <h2>
            Recursos e conhecimentos para devs que optam em fazer parte de um
            ecossistema global em empresas no exterior
          </h2>

          <p>
            Obter uma oportunidade no exterior é um objetivo e um sonho para
            muitos devs que procuram expandir o conhecimento através de
            experiências multiculturais. Apesar de haver uma série de desafios —
            que vão desde a qualificação profissional até a bagagem de
            conhecimento exigida lá fora — muitas pessoas desenvolvedoras
            conseguem abrir as fronteiras em seus currículos.
          </p>

          <p>
            Uma série de dicas e vivências são compartilhadas diariamente por
            pessoas programadoras. O mais importante, no meio de tudo isso, é o
            reconhecimento de que a programação é feita por uma comunidade
            global de pessoas que trabalham com tecnologia. Neste artigo vamos
            introduzir alguns recursos e conhecimentos que são fundamentais para
            qualquer profissional de TI que pretende aplicar para vagas no
            exterior. Boa leitura!
          </p>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
