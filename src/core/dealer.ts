import { type Hand } from './hand';

/**
 * Dealer module - implements dealer drawing rules
 * 
 * Rules: Dealer stands on Soft 17 (S17)
 * - Dealer must hit on hard 16 or less
 * - Dealer must hit on soft 17
 * - Dealer must stand on hard 17 or higher
 */

/**
 * TODO: Determine if dealer should hit
 * Dealer hits on hard totals <= 16
 * Dealer hits on soft 17 (S17 rule)
 * Dealer stands on hard 17 or higher
 * @param hand - Dealer's hand
 * @returns True if dealer should hit
 */
export function shouldDealerHit(hand: Hand): boolean {
  const hard_total = hand.getHardTotal();
  const soft_total = hand.getSoftTotal();
  if (hand.isBlackjack()) return false;
  if (hard_total <= 16) return true;
  if (soft_total !== null && soft_total <= 17) return true;
  
  return false;
  
}

