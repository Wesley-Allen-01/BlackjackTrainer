import { type Hand } from './hand';
import { HandResult } from './gameState';

/**
 * Outcome module - resolves hand outcomes and calculates scores
 */

/**
 * TODO: Resolve the outcome of a hand
 * Rules:
 * - If player busts: dealer wins
 * - If dealer busts: player wins
 * - If both have blackjack: push
 * - If player has blackjack and dealer doesn't: player blackjack
 * - If dealer has blackjack and player doesn't: dealer blackjack
 * - Otherwise: compare totals, higher wins (push if equal)
 * @param playerHand - Player's hand
 * @param dealerHand - Dealer's hand
 * @returns The hand result
 */
export function resolveHand(playerHand: Hand, dealerHand: Hand): HandResult {
  throw new Error('TODO: Implement resolveHand');
}

/**
 * TODO: Calculate score change based on hand result
 * +10 for player win or player blackjack
 * -10 for dealer win or dealer blackjack
 * 0 for push
 * @param result - The hand result
 * @returns Score change (+10, -10, or 0)
 */
export function calculateScore(result: HandResult): number {
  throw new Error('TODO: Implement calculateScore');
}

