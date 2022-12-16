import Head from 'next/head';
import styled from 'styled-components';

import { CollectionHeader } from '../components/CollectionHeader';
import { CollectionAssetList } from '../components/CollectionAssetList';
import { getCryptoPunksCollection } from '../utils/getCryptoPunksCollection';

import type { InferGetServerSidePropsType } from 'next';

const Main = styled.div``;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: React.FC<Props> = ({ collection }) => {
  if (!collection) return <div>No collection</div>;

  return (
    <>
      <Head>
        <title>Trader Joe Exercise</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <CollectionHeader collection={collection} />
        <CollectionAssetList />
      </Main>
    </>
  );
};

export async function getServerSideProps() {
  const collection = await getCryptoPunksCollection();

  return {
    props: { collection },
  };
}

export default Home;
