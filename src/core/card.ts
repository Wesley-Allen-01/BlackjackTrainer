/**
 * Card module - defines card types and utilities
 */

export enum Suit {
  Hearts = 'hearts',
  Diamonds = 'diamonds',
  Clubs = 'clubs',
  Spades = 'spades',
}

export enum Rank {
  Ace = 'A',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
}

export interface Card {
  suit: Suit;
  rank: Rank;
}

/**
 * TODO: Create a card from suit and rank
 * @param suit - The suit of the card
 * @param rank - The rank of the card
 * @returns A Card object
 */
export function createCard(suit: Suit, rank: Rank): Card {
  return { suit, rank };
}

/**
 * TODO: Get the numeric value of a rank for scoring
 * Ace returns 1 (soft value), caller handles ace logic separately
 * Face cards (J, Q, K) return 10
 * @param rank - The rank of the card
 * @returns Numeric value (1-10)
 */
export function getRankValue(rank: Rank): number {
  if (rank === Rank.Ace) return 1;
  if (rank === Rank.Jack || rank === Rank.Queen || rank === Rank.King) return 10;
  return parseInt(rank);
}

/**
 * TODO: Check if two cards are equal (same suit and rank)
 * @param card1 - First card
 * @param card2 - Second card
 * @returns True if cards are equal
 */
export function areCardsEqual(card1: Card, card2: Card): boolean {
  return card1.suit === card2.suit && card1.rank === card2.rank;
}

/**
 * TODO: Check if a card is an ace
 * @param card - The card to check
 * @returns True if the card is an ace
 */
export function isAce(card: Card): boolean {
  return card.rank === Rank.Ace;
}

/**
 * TODO: Check if a card is a face card (J, Q, K)
 * @param card - The card to check
 * @returns True if the card is a face card
 */
export function isFaceCard(card: Card): boolean {
  return card.rank === Rank.Jack || card.rank === Rank.Queen || card.rank === Rank.King;
}

