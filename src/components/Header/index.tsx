import Image from 'next/image';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <a>
        <Image width={230} height={25} src="/logo.svg" />
      </a>
    </header>
  );
}
