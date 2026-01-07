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
  if (playerHand.isBusted()) return HandResult.DealerWin;
  if (dealerHand.isBusted()) return HandResult.PlayerWin;
  if (playerHand.isBlackjack() && !dealerHand.isBlackjack()) return HandResult.PlayerBlackjack;
  if (!playerHand.isBlackjack() && dealerHand.isBlackjack()) return HandResult.DealerBlackjack;
  if (playerHand.getBestTotal() > dealerHand.getBestTotal()) return HandResult.PlayerWin;
  if (playerHand.getBestTotal() < dealerHand.getBestTotal()) return HandResult.DealerWin;
  return HandResult.Push;
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
  if (result === HandResult.PlayerWin || result === HandResult.PlayerBlackjack) return 10;
  if (result === HandResult.DealerWin || result === HandResult.DealerBlackjack) return -10;
  return 0;
}

