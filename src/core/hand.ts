import { type Card, isAce, getRankValue } from './card';

/**
 * Hand module - manages a player's hand and calculates scores
 */

export class Hand {
  private cards: Card[] = [];

  /**
   * TODO: Add a card to the hand
   * @param card - The card to add
   */
  addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * TODO: Get all cards in the hand
   * @returns Array of cards
   */
  getCards(): Card[] {
    return this.cards;
  }

  /**
   * TODO: Get the hard total (aces count as 1)
   * @returns The hard total value
   */
  getHardTotal(): number {
    return this.cards.reduce((total, card) => total + getRankValue(card.rank), 0);
  }

  /**
   * TODO: Get the soft total (first ace counts as 11, others as 1)
   * Returns null if no ace or if soft total would bust
   * @returns The soft total value, or null if not applicable
   */
  getSoftTotal(): number | null {
    // check if hand has ace
    const hasAce = this.cards.some(card => isAce(card));
    if (!hasAce) return null;
    const total = this.cards.reduce((total, card) => total + getRankValue(card.rank), 0);
    if (total + 10 <= 21) return total + 10;
    return null;
  }

  /**
   * TODO: Get the best total (soft total if available and <= 21, otherwise hard total)
   * @returns The best total value
   */
  getBestTotal(): number {
    const softTotal = this.getSoftTotal();
    if (softTotal !== null) {
      return softTotal;
    }
    return this.getHardTotal();
  }

  /**
   * TODO: Check if the hand is a blackjack (exactly 2 cards totaling 21)
   * @returns True if hand is a blackjack
   */
  isBlackjack(): boolean {
    return this.cards.length === 2 && this.getBestTotal() === 21;
  }

  /**
   * TODO: Check if the hand is busted (best total > 21)
   * @returns True if hand is busted
   */
  isBusted(): boolean {
    return this.getBestTotal() > 21;
  }

  /**
   * TODO: Check if the hand can be split (exactly 2 cards with same rank)
   * @returns True if hand can be split
   */
  canSplit(): boolean {
    return this.cards.length === 2 && this.cards[0].rank === this.cards[1].rank;
  }

  /**
   * TODO: Get the count of cards in the hand
   * @returns Number of cards
   */
  getCardCount(): number {
    return this.cards.length;
  }
}

