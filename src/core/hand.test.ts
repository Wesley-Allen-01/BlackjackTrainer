import { describe, it, expect, beforeEach } from 'vitest';
import { Hand } from './hand';
import { Card, Suit, Rank, createCard } from './card';

describe('Hand', () => {
  let hand: Hand;

  beforeEach(() => {
    hand = new Hand();
  });

  describe('addCard and getCards', () => {
    it('should add a card to the hand', () => {
      const card = createCard(Suit.Hearts, Rank.Ace);
      hand.addCard(card);
      expect(hand.getCards()).toContainEqual(card);
    });

    it('should add multiple cards', () => {
      const card1 = createCard(Suit.Hearts, Rank.Ace);
      const card2 = createCard(Suit.Spades, Rank.King);
      hand.addCard(card1);
      hand.addCard(card2);
      
      const cards = hand.getCards();
      expect(cards).toHaveLength(2);
      expect(cards).toContainEqual(card1);
      expect(cards).toContainEqual(card2);
    });
  });

  describe('getHardTotal', () => {
    it('should return 0 for empty hand', () => {
      expect(hand.getHardTotal()).toBe(0);
    });

    it('should sum card values with aces as 1', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Five));
      expect(hand.getHardTotal()).toBe(12);
    });

    it('should count aces as 1', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.Ace));
      expect(hand.getHardTotal()).toBe(2);
    });

    it('should handle face cards correctly', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      expect(hand.getHardTotal()).toBe(20);
    });
  });

  describe('getSoftTotal', () => {
    it('should return null for hand without aces', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Five));
      expect(hand.getSoftTotal()).toBeNull();
    });

    it('should return soft total when ace can be 11', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      expect(hand.getSoftTotal()).toBe(18);
    });

    it('should return null if soft total would bust', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      hand.addCard(createCard(Suit.Diamonds, Rank.Queen));
      expect(hand.getSoftTotal()).toBeNull();
    });

    it('should use first ace as 11, others as 1', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.Ace));
      hand.addCard(createCard(Suit.Diamonds, Rank.Seven));
      expect(hand.getSoftTotal()).toBe(19);
    });
  });

  describe('getBestTotal', () => {
    it('should return hard total when no ace', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Five));
      expect(hand.getBestTotal()).toBe(12);
    });

    it('should return soft total when available and <= 21', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      expect(hand.getBestTotal()).toBe(18);
    });

    it('should return hard total when soft total would bust', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      hand.addCard(createCard(Suit.Diamonds, Rank.Queen));
      expect(hand.getBestTotal()).toBe(21);
    });
  });

  describe('isBlackjack', () => {
    it('should return true for Ace + 10-value card', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      expect(hand.isBlackjack()).toBe(true);
    });

    it('should return true for Ace + Ten', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.Ten));
      expect(hand.isBlackjack()).toBe(true);
    });

    it('should return false for non-blackjack hands', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      expect(hand.isBlackjack()).toBe(false);
    });

    it('should return false for 21 with more than 2 cards', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      hand.addCard(createCard(Suit.Diamonds, Rank.Seven));
      expect(hand.isBlackjack()).toBe(false);
    });
  });

  describe('isBusted', () => {
    it('should return false for totals <= 21', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      expect(hand.isBusted()).toBe(false);
    });

    it('should return true for totals > 21', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      hand.addCard(createCard(Suit.Diamonds, Rank.Two));
      expect(hand.isBusted()).toBe(true);
    });

    it('should return false for exactly 21', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Ace));
      expect(hand.isBusted()).toBe(false);
    });
  });

  describe('canSplit', () => {
    it('should return true for two cards of same rank', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      expect(hand.canSplit()).toBe(true);
    });

    it('should return false for two cards of different ranks', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Eight));
      expect(hand.canSplit()).toBe(false);
    });

    it('should return false for hand with more than 2 cards', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      hand.addCard(createCard(Suit.Diamonds, Rank.Seven));
      expect(hand.canSplit()).toBe(false);
    });

    it('should return false for empty hand', () => {
      expect(hand.canSplit()).toBe(false);
    });
  });

  describe('getCardCount', () => {
    it('should return 0 for empty hand', () => {
      expect(hand.getCardCount()).toBe(0);
    });

    it('should return correct count', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      expect(hand.getCardCount()).toBe(1);
      
      hand.addCard(createCard(Suit.Spades, Rank.King));
      expect(hand.getCardCount()).toBe(2);
    });
  });
});

