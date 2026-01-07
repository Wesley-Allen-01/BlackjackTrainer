import { type Hand } from '../hand';
import { type Card, Rank, getRankValue } from '../card';
import { Action, getAllowedActions } from '../actions';
import { type StrategyTable, type PlayerSituation, type DealerUpcard, type PairRank } from './types';

/**
 * Basic Strategy module - provides strategy recommendations
 */

/**
 * TODO: Get dealer upcard value for strategy lookup
 * Converts Card to DealerUpcard type ('2'-'10' or 'A')
 * @param card - Dealer's upcard
 * @returns DealerUpcard value
 */
function getDealerUpcardValue(card: Card): DealerUpcard {
  return card.rank as DealerUpcard;
}

/**
 * TODO: Get hardcoded basic strategy table
 * This should return a StrategyTable with all the basic strategy decisions
 * For now, return an empty structure - user will fill in the values
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
 * TODO: Determine player situation for strategy lookup
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
 * TODO: Recommend action based on basic strategy
 * Looks up the recommended action from the strategy table based on player situation
 * If recommended action is not allowed, falls back to next best option
 * @param playerHand - Player's hand
 * @param dealerUpcard - Dealer's upcard
 * @param allowedActions - Actions currently allowed
 * @returns Recommended action
 */
export function recommendAction(
  playerHand: Hand,
  dealerUpcard: Card,
  allowedActions: Action[]
): Action {
  const situation = getPlayerSituation(playerHand, dealerUpcard);
  const table = getBasicStrategyTable();
  if (situation.isPair) {
    return table.pairs[situation.pairRank as PairRank][getDealerUpcardValue(dealerUpcard)];
  } else if (situation.isSoft) {
    return table.softTotals[situation.handTotal][getDealerUpcardValue(dealerUpcard)];
  } else {
    return table.hardTotals[situation.handTotal][getDealerUpcardValue(dealerUpcard)];
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
  throw new Error('TODO: Implement isBasicStrategyCorrect');
}

