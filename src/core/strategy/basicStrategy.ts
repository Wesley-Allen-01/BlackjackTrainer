import { type Hand } from '../hand';
import { type Card, Rank } from '../card';
import { Action } from '../actions';
import { type StrategyTable, type PlayerSituation, type DealerUpcard, type PairRank, type HardTotal, type SoftTotal } from './types';

/**
 * Basic Strategy module - provides strategy recommendations
 */

/**
 * Converts Card to DealerUpcard type ('2'-'10' or 'A')
 * @param card - Dealer's upcard
 * @returns DealerUpcard value
 */
function getDealerUpcardValue(card: Card): DealerUpcard {
  if (card.rank === Rank.Ace) return 'A';
  if (card.rank === Rank.Jack || card.rank === Rank.Queen || card.rank === Rank.King) return '10';
  return card.rank as DealerUpcard;
}

/**
 * Returns a StrategyTable with all the basic strategy decisions
 * @returns Complete basic strategy table
 */
export function getBasicStrategyTable(): StrategyTable {
  const dealerUpcards: DealerUpcard[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];

  const createUpcardRow = (action: Action) => 
    Object.fromEntries(dealerUpcards.map(upcard => [upcard, action])) as { [upcard in DealerUpcard]: Action };  

  return {  
    hardTotals: {
      5: createUpcardRow(Action.Hit),
      6: createUpcardRow(Action.Hit),
      7: createUpcardRow(Action.Hit),
      8: createUpcardRow(Action.Hit),
      9: {
        '2': Action.Hit,
        '3': Action.Double,
        '4': Action.Double,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      10: {
        '2': Action.Double,
        '3': Action.Double,
        '4': Action.Double,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Double,
        '8': Action.Double,
        '9': Action.Double,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      11: createUpcardRow(Action.Double),
      12: {
        '2': Action.Hit,
        '3': Action.Hit,
        '4': Action.Stand,
        '5': Action.Stand,
        '6': Action.Stand,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      13: {
        '2': Action.Stand,
        '3': Action.Stand,
        '4': Action.Stand,
        '5': Action.Stand,
        '6': Action.Stand,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      14: {
        '2': Action.Stand,
        '3': Action.Stand,
        '4': Action.Stand,
        '5': Action.Stand,
        '6': Action.Stand,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      15: {
        '2': Action.Stand,
        '3': Action.Stand,
        '4': Action.Stand,
        '5': Action.Stand,
        '6': Action.Stand,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      16: {
        '2': Action.Stand,
        '3': Action.Stand,
        '4': Action.Stand,
        '5': Action.Stand,
        '6': Action.Stand,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      17: createUpcardRow(Action.Stand),
      18: createUpcardRow(Action.Stand),
      19: createUpcardRow(Action.Stand),
      20: createUpcardRow(Action.Stand),
      21: createUpcardRow(Action.Stand)
    },
    softTotals: {
      '13': {
        '2': Action.Hit,
        '3': Action.Hit,
        '4': Action.Hit,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      14: {
        '2': Action.Hit,
        '3': Action.Hit,
        '4': Action.Hit,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      15: {
        '2': Action.Hit,
        '3': Action.Hit,
        '4': Action.Double,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      16: {
        '2': Action.Hit,
        '3': Action.Hit,
        '4': Action.Double,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      17: {
        '2': Action.Hit,
        '3': Action.Double,
        '4': Action.Double,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      18: {
        '2': Action.Double,
        '3': Action.Double,
        '4': Action.Double,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Stand,
        '8': Action.Stand,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      19: {
        '2': Action.Stand,
        '3': Action.Stand,
        '4': Action.Stand,
        '5': Action.Stand,
        '6': Action.Double,
        '7': Action.Stand,
        '8': Action.Stand,
        '9': Action.Stand,
        '10': Action.Stand,
        'A': Action.Stand,
      },
      20: createUpcardRow(Action.Stand),
      21: createUpcardRow(Action.Stand)
    },
    pairs: {
      'A': {
        '2': Action.Split,
        '3': Action.Split,
        '4': Action.Split,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Split,
        '8': Action.Split,
        '9': Action.Split,
        '10': Action.Split,
        'A': Action.Hit,
      },
      2: {
        '2': Action.Split,
        '3': Action.Split,
        '4': Action.Split,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Split,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      3: {
        '2': Action.Split,
        '3': Action.Split,
        '4': Action.Split,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Split,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      4: {
        '2': Action.Hit,
        '3': Action.Hit,
        '4': Action.Hit,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      5: {
        '2': Action.Double,
        '3': Action.Double,
        '4': Action.Double,
        '5': Action.Double,
        '6': Action.Double,
        '7': Action.Double,
        '8': Action.Double,
        '9': Action.Double,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      6: {
        '2': Action.Split,
        '3': Action.Split,
        '4': Action.Split,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Hit,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      7: {
        '2': Action.Split,
        '3': Action.Split,
        '4': Action.Split,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Split,
        '8': Action.Hit,
        '9': Action.Hit,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      8: {
        '2': Action.Split,
        '3': Action.Split,
        '4': Action.Split,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Split,
        '8': Action.Split,
        '9': Action.Split,
        '10': Action.Hit,
        'A': Action.Hit,
      },
      9: {
        '2': Action.Split,
        '3': Action.Split,
        '4': Action.Split,
        '5': Action.Split,
        '6': Action.Split,
        '7': Action.Stand,
        '8': Action.Split,
        '9': Action.Split,
        '10': Action.Stand,
        'A': Action.Stand,
      },
      10: createUpcardRow(Action.Stand)
    },
  };
}

/**
 * Determines player situation for strategy lookup
 * @param hand - Player's hand
 * @param dealerUpcard - Dealer's upcard
 * @returns PlayerSituation object
 */
function getPlayerSituation(hand: Hand, dealerUpcard: Card): PlayerSituation {
  return {
    handTotal: hand.getBestTotal(),
    isSoft: hand.getSoftTotal() !== null,
    isPair: hand.getCardCount() === 2 && hand.getCards()[0].rank === hand.getCards()[1].rank,
    pairRank: hand.getCards()[0].rank as PairRank,
    dealerUpcard: dealerUpcard,
  };
}

/**
 * Looks up the recommended action from the strategy table based on player situation
 * If recommended action is not allowed, falls back to next best option
 * @param playerHand - Player's hand
 * @param dealerUpcard - Dealer's upcard
 * @returns Recommended action
 */
export function recommendAction(
  playerHand: Hand,
  dealerUpcard: Card,
): Action {
  const situation = getPlayerSituation(playerHand, dealerUpcard);
  const table = getBasicStrategyTable();

  if (situation.isPair) {
    return table.pairs[situation.pairRank as PairRank][getDealerUpcardValue(dealerUpcard)];
  } else if (situation.isSoft) {
    return table.softTotals[situation.handTotal as SoftTotal][getDealerUpcardValue(dealerUpcard)];
  } else {
    return table.hardTotals[situation.handTotal as HardTotal][getDealerUpcardValue(dealerUpcard)];
  }
}

/**
 * TODO: Check if player's action matches basic strategy recommendation
 * @param playerAction - Action player chose
 * @param recommendedAction - Action recommended by basic strategy
 * @returns True if actions match
 */
export function isBasicStrategyCorrect(
  playerAction: Action,
  recommendedAction: Action
): boolean {
  return playerAction === recommendedAction;
}

