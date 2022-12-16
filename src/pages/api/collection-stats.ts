import axios from 'axios';

import { camelizeKeys } from '../../utils/data';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { OpenSeaCollection } from 'opensea-js/lib/types';

export type OpenSeaCollectionStats = OpenSeaCollection['stats'] & {
  averagePrice: number;
  count: number;
  marketCap: number;
  numOwners: number;
  oneDayVolume: number;
  sevenDayVolume: number;
  sixHourVolume: number;
  thirtyDayVolume: number;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<OpenSeaCollectionStats | { message: string }>,
) {
  const {
    query: { slug = '' },
  } = request;

  const options = {
    headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    method: 'GET',
    url: `https://api.opensea.io/api/v1/collection/${slug}/stats`,
  };

  try {
    const { data } = await axios.request<{}, { data: OpenSeaCollectionStats }>(
      options,
    );

    const formattedData = camelizeKeys(data);

    response.status(200).json(formattedData);
  } catch (err) {
    response.status(200).json({ message: 'Error fetching contract details' });
  }
}
