import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { assets } from '../utils/data';

const AssetListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 1rem;
  padding-top: 2rem;
`;

const AssetItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin-bottom: 2rem;
  border-radius: 1rem;
  cursor: pointer;
  filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));

  img {
    height: 90%;
    width: 100%;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const AssetItemHeader = styled.div`
  border: 1px solid black;
  border-bottom: none;
  width: 100%;
  box-sizing: border-box;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem;
  font-weight: 700;
`;

export const CollectionAssetList: React.FC = () => {
  return (
    <AssetListWrapper>
      {assets.map((asset) => {
        return (
          <AssetItem
            key={asset.id}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <AssetItemHeader>{asset.name}</AssetItemHeader>
            <Image
              alt={asset.name}
              src={asset.imageUrl}
              width={100}
              height={100}
              priority
            />
          </AssetItem>
        );
      })}
    </AssetListWrapper>
  );
};
