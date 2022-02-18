import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Image width={230} height={25} src="/logo.svg" alt="logo" />
        </a>
      </Link>
    </header>
  );
}
