import { type Card } from '../card';
import { Action } from '../actions';

/**
 * Strategy types module - defines data models for basic strategy tables
 */

/**
 * Dealer upcard values (2-10, A)
 */
export type DealerUpcard = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'A';

/**
 * Hard total values (5-21)
 */
export type HardTotal = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

/**
 * Soft total values (13-21, where first ace is 11)
 */
export type SoftTotal = 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

/**
 * Pair ranks (for splitting)
 */
export type PairRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

/**
 * Strategy table for hard totals
 * Maps hard total -> dealer upcard -> recommended action
 */
export type HardTotalStrategy = {
  [total in HardTotal]: {
    [upcard in DealerUpcard]: Action;
  };
};

/**
 * Strategy table for soft totals
 * Maps soft total -> dealer upcard -> recommended action
 */
export type SoftTotalStrategy = {
  [total in SoftTotal]: {
    [upcard in DealerUpcard]: Action;
  };
};

/**
 * Strategy table for pairs
 * Maps pair rank -> dealer upcard -> recommended action
 */
export type PairStrategy = {
  [rank in PairRank]: {
    [upcard in DealerUpcard]: Action;
  };
};

/**
 * Complete basic strategy table
 */
export interface StrategyTable {
  hardTotals: HardTotalStrategy;
  softTotals: SoftTotalStrategy;
  pairs: PairStrategy;
}

/**
 * Player situation for strategy lookup
 */
export interface PlayerSituation {
  handTotal: number;
  isSoft: boolean;
  isPair: boolean;
  pairRank?: PairRank;
  dealerUpcard: Card;
}

