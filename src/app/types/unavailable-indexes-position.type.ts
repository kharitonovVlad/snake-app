import { UnavailableIndexes } from './unavailable-indexes.type';

export type UnavailableIndexesPosition = {
  head: UnavailableIndexes;
  tail: UnavailableIndexes[];
};
