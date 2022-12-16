import { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import styled from 'styled-components';

import { OpenSeaCollectionStats } from '../pages/api/collection-stats';
import { apiRequest } from '../utils/apiRequest';
import { ExtendedOpenSeaCollection } from '../utils/getCryptoPunksCollection';

import type { OpenSeaCollection } from 'opensea-js/lib/types';

const CollectionLayout = styled.div<{ backgroundImage: string }>`
  background-image: ${(props) => props.backgroundImage};
  height: 30vh;
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const CollectionDetails = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 70%;
  width: 40%;
  background-color: white;
  border-radius: 2rem;
  padding: 1rem;
  opacity: 0.9;
  cursor: pointer;
`;

const CollectionName = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const ContractDetails = styled(motion.div)`
  display: flex;
  width: 40%;
  opacity: 0.9;
  background-color: white;
  border-radius: 2rem;
  padding: 1rem;
  cursor: pointer;
`;

const ContractDetailsColumn = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

type Props = {
  collection: ExtendedOpenSeaCollection<{
    bannerImageUrl: string;
  }>;
};

export const CollectionHeader: React.FC<Props> = ({ collection }) => {
  const [contractStats, setContractStats] = useState<OpenSeaCollectionStats>();
  const [contractDetailsOpen, setContractDetailsOpen] = useState(false);

  useEffect(() => {
    const getContractDetails = async (slug: OpenSeaCollection['slug']) => {
      try {
        const { data } = await apiRequest<{ stats: OpenSeaCollectionStats }>({
          params: { slug },
          url: '/api/collection-stats',
        });

        setContractStats(data.stats);
      } catch (err) {
        console.log(err);
      }
    };

    if (collection.slug && !contractStats) {
      getContractDetails(collection.slug);
    }
  }, [collection.slug, contractStats]);

  const variants: Variants = {
    open: { fontSize: '1rem', height: '70%' },
    closed: { fontSize: 0, height: 0 },
  };

  return (
    <CollectionLayout backgroundImage={`url(${collection.bannerImageUrl})`}>
      <CollectionDetails
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={() => setContractDetailsOpen((prev) => !prev)}
      >
        <CollectionName>{collection.name}</CollectionName>
        <div>{collection.description}</div>
      </CollectionDetails>
      <AnimatePresence>
        {contractDetailsOpen && (
          <ContractDetails
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setContractDetailsOpen((prev) => !prev)}
          >
            <ContractDetailsColumn>
              <div>Total count: {contractStats?.count}</div>
              <div>
                Average price: {contractStats?.averagePrice.toFixed(1)} ETH
              </div>
              <div>Market cap: {contractStats?.marketCap.toFixed(0)} ETH</div>
              <div>Number of owners: {contractStats?.numOwners}</div>
            </ContractDetailsColumn>
            <ContractDetailsColumn>
              <div>
                6 hour vol: {contractStats?.sixHourVolume.toFixed(1)} ETH
              </div>
              <div>
                One day vol: {contractStats?.oneDayVolume.toFixed(1)} ETH
              </div>
              <div>
                7 day vol: {contractStats?.sevenDayVolume.toFixed(1)} ETH
              </div>
              <div>
                30 day vol: {contractStats?.thirtyDayVolume.toFixed(1)} ETH
              </div>
            </ContractDetailsColumn>
          </ContractDetails>
        )}
      </AnimatePresence>
    </CollectionLayout>
  );
};
