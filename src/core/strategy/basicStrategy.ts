import { type Hand } from '../hand';
import { type Card, Rank, getRankValue } from '../card';
import { Action, getAllowedActions } from '../actions';
import { type StrategyTable, type PlayerSituation, type DealerUpcard } from './types';

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
  throw new Error('TODO: Implement getDealerUpcardValue');
}

/**
 * TODO: Get hardcoded basic strategy table
 * This should return a StrategyTable with all the basic strategy decisions
 * For now, return an empty structure - user will fill in the values
 * @returns Complete basic strategy table
 */
export function getBasicStrategyTable(): StrategyTable {
  throw new Error('TODO: Implement getBasicStrategyTable - fill in the strategy table values');
}

/**
 * TODO: Determine player situation for strategy lookup
 * @param hand - Player's hand
 * @param dealerUpcard - Dealer's upcard
 * @returns PlayerSituation object
 */
function getPlayerSituation(hand: Hand, dealerUpcard: Card): PlayerSituation {
  throw new Error('TODO: Implement getPlayerSituation');
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
  throw new Error('TODO: Implement recommendAction');
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

