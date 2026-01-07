import { describe, it, expect } from 'vitest';
import {
  Suit,
  Rank,
  createCard,
  getRankValue,
  areCardsEqual,
  isAce,
  isFaceCard,
  type Card,
} from './card';

describe('card', () => {
  describe('createCard', () => {
    it('should create a card with given suit and rank', () => {
      const card = createCard(Suit.Hearts, Rank.Ace);
      expect(card.suit).toBe(Suit.Hearts);
      expect(card.rank).toBe(Rank.Ace);
    });

    it('should create cards with different suits and ranks', () => {
      const card1 = createCard(Suit.Spades, Rank.King);
      const card2 = createCard(Suit.Diamonds, Rank.Seven);
      
      expect(card1.suit).toBe(Suit.Spades);
      expect(card1.rank).toBe(Rank.King);
      expect(card2.suit).toBe(Suit.Diamonds);
      expect(card2.rank).toBe(Rank.Seven);
    });
  });

  describe('getRankValue', () => {
    it('should return 1 for Ace', () => {
      expect(getRankValue(Rank.Ace)).toBe(1);
    });

    it('should return correct values for number cards', () => {
      expect(getRankValue(Rank.Two)).toBe(2);
      expect(getRankValue(Rank.Three)).toBe(3);
      expect(getRankValue(Rank.Four)).toBe(4);
      expect(getRankValue(Rank.Five)).toBe(5);
      expect(getRankValue(Rank.Six)).toBe(6);
      expect(getRankValue(Rank.Seven)).toBe(7);
      expect(getRankValue(Rank.Eight)).toBe(8);
      expect(getRankValue(Rank.Nine)).toBe(9);
      expect(getRankValue(Rank.Ten)).toBe(10);
    });

    it('should return 10 for face cards', () => {
      expect(getRankValue(Rank.Jack)).toBe(10);
      expect(getRankValue(Rank.Queen)).toBe(10);
      expect(getRankValue(Rank.King)).toBe(10);
    });
  });

  describe('areCardsEqual', () => {
    it('should return true for identical cards', () => {
      const card1 = createCard(Suit.Hearts, Rank.Ace);
      const card2 = createCard(Suit.Hearts, Rank.Ace);
      expect(areCardsEqual(card1, card2)).toBe(true);
    });

    it('should return false for cards with different suits', () => {
      const card1 = createCard(Suit.Hearts, Rank.Ace);
      const card2 = createCard(Suit.Spades, Rank.Ace);
      expect(areCardsEqual(card1, card2)).toBe(false);
    });

    it('should return false for cards with different ranks', () => {
      const card1 = createCard(Suit.Hearts, Rank.Ace);
      const card2 = createCard(Suit.Hearts, Rank.King);
      expect(areCardsEqual(card1, card2)).toBe(false);
    });
  });

  describe('isAce', () => {
    it('should return true for ace cards', () => {
      const ace = createCard(Suit.Hearts, Rank.Ace);
      expect(isAce(ace)).toBe(true);
    });

    it('should return false for non-ace cards', () => {
      const king = createCard(Suit.Hearts, Rank.King);
      const seven = createCard(Suit.Hearts, Rank.Seven);
      expect(isAce(king)).toBe(false);
      expect(isAce(seven)).toBe(false);
    });
  });

  describe('isFaceCard', () => {
    it('should return true for Jack, Queen, and King', () => {
      const jack = createCard(Suit.Hearts, Rank.Jack);
      const queen = createCard(Suit.Hearts, Rank.Queen);
      const king = createCard(Suit.Hearts, Rank.King);
      
      expect(isFaceCard(jack)).toBe(true);
      expect(isFaceCard(queen)).toBe(true);
      expect(isFaceCard(king)).toBe(true);
    });

    it('should return false for Ace and number cards', () => {
      const ace = createCard(Suit.Hearts, Rank.Ace);
      const seven = createCard(Suit.Hearts, Rank.Seven);
      const ten = createCard(Suit.Hearts, Rank.Ten);
      
      expect(isFaceCard(ace)).toBe(false);
      expect(isFaceCard(seven)).toBe(false);
      expect(isFaceCard(ten)).toBe(false);
    });
  });
});

