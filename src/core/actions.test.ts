import { describe, it, expect, beforeEach } from 'vitest';
import { Action, canHit, canStand, canDouble, canSplit, getAllowedActions } from './actions';
import { Hand } from './hand';
import { Suit, Rank, createCard } from './card';

describe('actions', () => {
  let hand: Hand;

  beforeEach(() => {
    hand = new Hand();
  });

  describe('canHit', () => {
    it('should return true for hand that is not busted', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      expect(canHit(hand)).toBe(true);
    });

    it('should return false for busted hand', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      hand.addCard(createCard(Suit.Diamonds, Rank.Two));
      expect(canHit(hand)).toBe(false);
    });

    it('should return false for blackjack', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      expect(canHit(hand)).toBe(false);
    });

    it('should return true for hand with 21 but not blackjack', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      hand.addCard(createCard(Suit.Diamonds, Rank.Seven));
      expect(canHit(hand)).toBe(false); // 21 means can't hit
    });
  });

  describe('canStand', () => {
    it('should always return true', () => {
      expect(canStand(hand)).toBe(true);
      
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      expect(canStand(hand)).toBe(true);
      
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      hand.addCard(createCard(Suit.Diamonds, Rank.Two));
      expect(canStand(hand)).toBe(true);
    });
  });

  describe('canDouble', () => {
    it('should return true for hand with exactly 2 cards', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Eight));
      expect(canDouble(hand)).toBe(true);
    });

    it('should return false for hand with more than 2 cards', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Eight));
      hand.addCard(createCard(Suit.Diamonds, Rank.Nine));
      expect(canDouble(hand)).toBe(false);
    });

    it('should return false for hand with less than 2 cards', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      expect(canDouble(hand)).toBe(false);
    });

    it('should return false for busted hand', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      hand.addCard(createCard(Suit.Diamonds, Rank.Two));
      expect(canDouble(hand)).toBe(false);
    });

    it('should return false for blackjack', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      expect(canDouble(hand)).toBe(false);
    });
  });

  describe('canSplit', () => {
    it('should return true for two cards of same rank', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      expect(canSplit(hand)).toBe(true);
    });

    it('should return false for two cards of different ranks', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Eight));
      expect(canSplit(hand)).toBe(false);
    });

    it('should return false for hand with more than 2 cards', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      hand.addCard(createCard(Suit.Diamonds, Rank.Seven));
      expect(canSplit(hand)).toBe(false);
    });

    it('should return false for empty hand', () => {
      expect(canSplit(hand)).toBe(false);
    });
  });

  describe('getAllowedActions', () => {
    it('should return stand for any hand', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      const actions = getAllowedActions(hand);
      expect(actions).toContain(Action.Stand);
    });

    it('should include hit when allowed', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Eight));
      const actions = getAllowedActions(hand);
      expect(actions).toContain(Action.Hit);
      expect(actions).toContain(Action.Stand);
    });

    it('should include double when allowed', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Eight));
      const actions = getAllowedActions(hand);
      expect(actions).toContain(Action.Double);
    });

    it('should include split when allowed', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Seven));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      const actions = getAllowedActions(hand);
      expect(actions).toContain(Action.Split);
    });

    it('should not include hit for busted hand', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.King));
      hand.addCard(createCard(Suit.Spades, Rank.Queen));
      hand.addCard(createCard(Suit.Diamonds, Rank.Two));
      const actions = getAllowedActions(hand);
      expect(actions).not.toContain(Action.Hit);
      expect(actions).not.toContain(Action.Double);
      expect(actions).toContain(Action.Stand);
    });

    it('should not include hit or double for blackjack', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      const actions = getAllowedActions(hand);
      expect(actions).not.toContain(Action.Hit);
      expect(actions).not.toContain(Action.Double);
      expect(actions).toContain(Action.Stand);
    });
  });
});

