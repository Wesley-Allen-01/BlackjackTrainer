import { describe, it, expect, beforeEach } from 'vitest';
import { resolveHand, calculateScore } from './outcome';
import { Hand } from './hand';
import { HandResult } from './gameState';
import { Suit, Rank, createCard } from './card';

describe('outcome', () => {
  let playerHand: Hand;
  let dealerHand: Hand;

  beforeEach(() => {
    playerHand = new Hand();
    dealerHand = new Hand();
  });

  describe('resolveHand', () => {
    it('should return dealer_win if player busts', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.King));
      playerHand.addCard(createCard(Suit.Spades, Rank.Queen));
      playerHand.addCard(createCard(Suit.Diamonds, Rank.Two));

      dealerHand.addCard(createCard(Suit.Hearts, Rank.Ten));
      dealerHand.addCard(createCard(Suit.Spades, Rank.Seven));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.DealerWin);
    });

    it('should return player_win if dealer busts', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.King));
      playerHand.addCard(createCard(Suit.Spades, Rank.Queen));

      dealerHand.addCard(createCard(Suit.Hearts, Rank.Ten));
      dealerHand.addCard(createCard(Suit.Spades, Rank.Queen));
      dealerHand.addCard(createCard(Suit.Diamonds, Rank.Two));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.PlayerWin);
    });

    it('should return push if both have blackjack', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ace));
      playerHand.addCard(createCard(Suit.Spades, Rank.King));

      dealerHand.addCard(createCard(Suit.Diamonds, Rank.Ace));
      dealerHand.addCard(createCard(Suit.Clubs, Rank.King));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.Push);
    });

    it('should return player_blackjack if only player has blackjack', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ace));
      playerHand.addCard(createCard(Suit.Spades, Rank.King));

      dealerHand.addCard(createCard(Suit.Diamonds, Rank.Ten));
      dealerHand.addCard(createCard(Suit.Clubs, Rank.Seven));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.PlayerBlackjack);
    });

    it('should return dealer_blackjack if only dealer has blackjack', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ten));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));

      dealerHand.addCard(createCard(Suit.Diamonds, Rank.Ace));
      dealerHand.addCard(createCard(Suit.Clubs, Rank.King));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.DealerBlackjack);
    });

    it('should return player_win if player total is higher', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.King));
      playerHand.addCard(createCard(Suit.Spades, Rank.Nine));

      dealerHand.addCard(createCard(Suit.Diamonds, Rank.Ten));
      dealerHand.addCard(createCard(Suit.Clubs, Rank.Seven));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.PlayerWin);
    });

    it('should return dealer_win if dealer total is higher', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ten));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));

      dealerHand.addCard(createCard(Suit.Diamonds, Rank.King));
      dealerHand.addCard(createCard(Suit.Clubs, Rank.Nine));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.DealerWin);
    });

    it('should return push if totals are equal', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ten));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));

      dealerHand.addCard(createCard(Suit.Diamonds, Rank.King));
      dealerHand.addCard(createCard(Suit.Clubs, Rank.Seven));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.Push);
    });

    it('should handle soft totals correctly', () => {
      playerHand.addCard(createCard(Suit.Hearts, Rank.Ace));
      playerHand.addCard(createCard(Suit.Spades, Rank.Seven));

      dealerHand.addCard(createCard(Suit.Diamonds, Rank.Ten));
      dealerHand.addCard(createCard(Suit.Clubs, Rank.Seven));

      expect(resolveHand(playerHand, dealerHand)).toBe(HandResult.PlayerWin);
    });
  });

  describe('calculateScore', () => {
    it('should return +10 for player_win', () => {
      expect(calculateScore(HandResult.PlayerWin)).toBe(10);
    });

    it('should return +10 for player_blackjack', () => {
      expect(calculateScore(HandResult.PlayerBlackjack)).toBe(10);
    });

    it('should return -10 for dealer_win', () => {
      expect(calculateScore(HandResult.DealerWin)).toBe(-10);
    });

    it('should return -10 for dealer_blackjack', () => {
      expect(calculateScore(HandResult.DealerBlackjack)).toBe(-10);
    });

    it('should return 0 for push', () => {
      expect(calculateScore(HandResult.Push)).toBe(0);
    });
  });
});

