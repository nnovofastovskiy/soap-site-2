import { withLayout } from '../layout/ClientLayout/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Hero } from '../components';

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles['hero-img']}>
        <Image
          src={process.env.NEXT_PUBLIC_DOMAIN + '/images/image26.png'}
          // width={1900}
          // height={600}
          priority
          objectPosition={'50% 50%'}
          objectFit={'cover'}
          layout={'fill'}
        />
      </div>
      <Hero className={styles.hero} />
      <Link href={'/products'}>Products</Link>
    </main>
  );
};

export default withLayout(Home);
