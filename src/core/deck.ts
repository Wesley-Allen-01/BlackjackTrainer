import { Suit, Rank, type Card, createCard } from './card';

/**
 * Deck module - manages a deck of cards
 */

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.reshuffle();
  }

  /**
   * TODO: Shuffle the deck using Fisher-Yates algorithm
   * Should randomize the order of cards in the deck
   */
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * TODO: Deal a single card from the top of the deck
   * Should remove and return the first card
   * @returns The dealt card
   * @throws Error if deck is empty
   */
  deal(): Card {
    if (this.cards.length === 0) {
      throw new Error('Deck is empty');
    }
    return this.cards.shift()!;
  }

  /**
   * TODO: Reshuffle the deck - create a fresh 52-card deck and shuffle it
   * Should create one card of each suit/rank combination and shuffle
   */
  reshuffle(): void {
    this.cards = [];
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        this.cards.push(createCard(suit, rank));
      }
    }
    this.shuffle();
  }

  /**
   * TODO: Get the number of cards remaining in the deck
   * @returns Number of cards remaining
   */
  getRemainingCount(): number {
    return this.cards.length;
  }
}

