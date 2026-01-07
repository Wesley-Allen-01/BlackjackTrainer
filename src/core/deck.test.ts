import { describe, it, expect, beforeEach } from 'vitest';
import { Deck } from './deck';
import { Suit, Rank } from './card';

describe('Deck', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  describe('reshuffle', () => {
    it('should create a full 52-card deck', () => {
      deck.reshuffle();
      expect(deck.getRemainingCount()).toBe(52);
    });

    it('should contain all suits and ranks', () => {
      deck.reshuffle();
      const cards: { suit: Suit; rank: Rank }[] = [];
      
      // Deal all cards
      while (deck.getRemainingCount() > 0) {
        cards.push(deck.deal());
      }

      // Check all combinations exist
      const suits = Object.values(Suit);
      const ranks = Object.values(Rank);
      
      for (const suit of suits) {
        for (const rank of ranks) {
          const found = cards.some(c => c.suit === suit && c.rank === rank);
          expect(found).toBe(true);
        }
      }
    });
  });

  describe('shuffle', () => {
    it('should randomize card order', () => {
      deck.reshuffle();
      const firstOrder: string[] = [];
      
      // Deal all cards and record order
      while (deck.getRemainingCount() > 0) {
        const card = deck.deal();
        firstOrder.push(`${card.suit}-${card.rank}`);
      }

      // Reshuffle and deal again
      deck.reshuffle();
      const secondOrder: string[] = [];
      while (deck.getRemainingCount() > 0) {
        const card = deck.deal();
        secondOrder.push(`${card.suit}-${card.rank}`);
      }

      // Order should be different (very unlikely to be same after shuffle)
      // Note: This test could theoretically fail, but probability is extremely low
      expect(firstOrder).not.toEqual(secondOrder);
    });

    it('should maintain all cards after shuffling', () => {
      deck.reshuffle();
      const beforeCount = deck.getRemainingCount();
      deck.shuffle();
      const afterCount = deck.getRemainingCount();
      
      expect(afterCount).toBe(beforeCount);
    });
  });

  describe('deal', () => {
    it('should return a card', () => {
      deck.reshuffle();
      const card = deck.deal();
      expect(card).toBeDefined();
      expect(card.suit).toBeDefined();
      expect(card.rank).toBeDefined();
    });

    it('should remove card from deck', () => {
      deck.reshuffle();
      const initialCount = deck.getRemainingCount();
      deck.deal();
      expect(deck.getRemainingCount()).toBe(initialCount - 1);
    });

    it('should throw error when deck is empty', () => {
      deck.reshuffle();
      // Deal all cards
      while (deck.getRemainingCount() > 0) {
        deck.deal();
      }
      
      expect(() => deck.deal()).toThrow();
    });

    it('should deal cards in order', () => {
      deck.reshuffle();
      const card1 = deck.deal();
      const card2 = deck.deal();
      
      // Cards should be different
      expect(card1).not.toEqual(card2);
    });
  });

  describe('getRemainingCount', () => {
    it('should return 52 for a fresh deck', () => {
      deck.reshuffle();
      expect(deck.getRemainingCount()).toBe(52);
    });

    it('should decrease as cards are dealt', () => {
      deck.reshuffle();
      expect(deck.getRemainingCount()).toBe(52);
      
      deck.deal();
      expect(deck.getRemainingCount()).toBe(51);
      
      deck.deal();
      expect(deck.getRemainingCount()).toBe(50);
    });

    it('should return 0 when all cards are dealt', () => {
      deck.reshuffle();
      while (deck.getRemainingCount() > 0) {
        deck.deal();
      }
      expect(deck.getRemainingCount()).toBe(0);
    });
  });
});

