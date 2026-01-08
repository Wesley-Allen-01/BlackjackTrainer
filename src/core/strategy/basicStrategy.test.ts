import { describe, it, expect, beforeEach } from 'vitest';
import {
  recommendAction,
  isBasicStrategyCorrect,
  getBasicStrategyTable,
} from './basicStrategy';
import { Hand } from '../hand';
import { Action } from '../actions';
import { Suit, Rank, createCard } from '../card';

describe('basicStrategy', () => {
  let playerHand: Hand;
  let dealerUpcard: ReturnType<typeof createCard>;

  beforeEach(() => {
    playerHand = new Hand();
    dealerUpcard = createCard(Suit.Diamonds, Rank.Seven);
  });

  describe('getBasicStrategyTable', () => {
    it('should return a strategy table structure', () => {
      const table = getBasicStrategyTable();
      expect(table).toBeDefined();
      expect(table.hardTotals).toBeDefined();
      expect(table.softTotals).toBeDefined();
      expect(table.pairs).toBeDefined();
    });

    it('should have entries for all hard totals', () => {
      const table = getBasicStrategyTable();
      const hardTotals = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      for (const total of hardTotals) {
        expect(table.hardTotals[total as keyof typeof table.hardTotals]).toBeDefined();
      }
    });

    it('should have entries for all soft totals', () => {
      const table = getBasicStrategyTable();
      const softTotals = [13, 14, 15, 16, 17, 18, 19, 20, 21];
      for (const total of softTotals) {
        expect(table.softTotals[total as keyof typeof table.softTotals]).toBeDefined();
      }
    });

    it('should have entries for all pairs', () => {
      const table = getBasicStrategyTable();
      const pairs = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      for (const pair of pairs) {
        expect(table.pairs[pair as keyof typeof table.pairs]).toBeDefined();
      }
    });
  });

  describe('recommendAction', () => {
    it('should return an action from allowed actions', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Seven));
      playerHand.addCard(createCard(Suit.Spades, Rank.Eight));
      const allowedActions = [Action.Hit, Action.Stand, Action.Double];
      
      const recommendation = recommendAction(playerHand, dealerUpcard);
      expect(allowedActions).toContain(recommendation);
    });

    it('should handle hard totals', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ten));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));
      
      const recommendation = recommendAction(playerHand, dealerUpcard);
      expect([Action.Hit, Action.Stand]).toContain(recommendation);
    });

    it('should handle soft totals', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ace));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));
      const allowedActions = [Action.Hit, Action.Stand, Action.Double];
      
      const recommendation = recommendAction(playerHand, dealerUpcard);
      expect(allowedActions).toContain(recommendation);
    });

    it('should handle pairs', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Seven));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));
      const allowedActions = [Action.Hit, Action.Stand, Action.Double, Action.Split];
      
      const recommendation = recommendAction(playerHand, dealerUpcard);
      expect(allowedActions).toContain(recommendation);
    });

    it('should fall back to allowed action if recommended is not allowed', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ten));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));
      
      const recommendation = recommendAction(playerHand, dealerUpcard);
      expect(recommendation).toBe(Action.Stand);
    });
  });

  describe('isBasicStrategyCorrect', () => {
    it('should return true when actions match', () => {
      expect(isBasicStrategyCorrect(Action.Hit, Action.Hit)).toBe(true);
      expect(isBasicStrategyCorrect(Action.Stand, Action.Stand)).toBe(true);
      expect(isBasicStrategyCorrect(Action.Double, Action.Double)).toBe(true);
      expect(isBasicStrategyCorrect(Action.Split, Action.Split)).toBe(true);
    });

    it('should return false when actions do not match', () => {
      expect(isBasicStrategyCorrect(Action.Hit, Action.Stand)).toBe(false);
      expect(isBasicStrategyCorrect(Action.Stand, Action.Hit)).toBe(false);
      expect(isBasicStrategyCorrect(Action.Double, Action.Hit)).toBe(false);
      expect(isBasicStrategyCorrect(Action.Split, Action.Stand)).toBe(false);
    });
  });

  describe('additionalTests', () => {
    it("Should return correct action for j4vsk test case", () => {
      playerHand.addCard(createCard(Suit.Clubs, Rank.Jack));
      playerHand.addCard(createCard(Suit.Clubs, Rank.Four));
      dealerUpcard = createCard(Suit.Clubs, Rank.King);
      const recommendation = recommendAction(playerHand, dealerUpcard);
      expect(recommendation).toBe(Action.Hit);
    });
  })
});

