import { camelizeKeys } from './data';
import { apiRequest } from './apiRequest';

import type { OpenSeaCollection } from 'opensea-js/lib/types';

export type ExtendedOpenSeaCollection<T> = T & OpenSeaCollection;

export const getCryptoPunksCollection = async () => {
  const options = {
    headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    method: 'GET' as const,
    url: 'https://api.opensea.io/api/v1/collection/cryptopunks',
  };

  try {
    const { data } = await apiRequest<{
      collection: ExtendedOpenSeaCollection<{
        bannerImageUrl: string;
      }>;
    }>(options);

    const formattedCollection = camelizeKeys(data.collection);

    return formattedCollection;
  } catch (err) {
    return null;
  }
};
