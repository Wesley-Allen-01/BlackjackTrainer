import { describe, it, expect, beforeEach } from 'vitest';
import { shouldDealerHit } from './dealer';
import { Hand } from './hand';
import { Suit, Rank, createCard } from './card';

describe('dealer', () => {
  let hand: Hand;

  beforeEach(() => {
    hand = new Hand();
  });

  describe('shouldDealerHit', () => {
    it('should hit on hard totals <= 16', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ten));
      hand.addCard(createCard(Suit.Spades, Rank.Six));
      expect(shouldDealerHit(hand)).toBe(true);
    });

    it('should hit on hard 16', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ten));
      hand.addCard(createCard(Suit.Spades, Rank.Six));
      expect(shouldDealerHit(hand)).toBe(true);
    });

    it('should hit on soft 17 (S17 rule)', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.Six));
      expect(shouldDealerHit(hand)).toBe(true);
    });

    it('should stand on hard 17', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ten));
      hand.addCard(createCard(Suit.Spades, Rank.Seven));
      expect(shouldDealerHit(hand)).toBe(false);
    });

    it('should stand on hard 18', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ten));
      hand.addCard(createCard(Suit.Spades, Rank.Eight));
      expect(shouldDealerHit(hand)).toBe(false);
    });

    it('should stand on hard 21', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ten));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      hand.addCard(createCard(Suit.Diamonds, Rank.Ace));
      expect(shouldDealerHit(hand)).toBe(false);
    });

    it('should stand on blackjack', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ace));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      expect(shouldDealerHit(hand)).toBe(false);
    });

    it('should stand on busted hand (though dealer should never reach this state)', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Ten));
      hand.addCard(createCard(Suit.Spades, Rank.King));
      hand.addCard(createCard(Suit.Diamonds, Rank.Two));
      expect(shouldDealerHit(hand)).toBe(false);
    });

    it('should hit on low totals', () => {
      hand.addCard(createCard(Suit.Hearts, Rank.Five));
      hand.addCard(createCard(Suit.Spades, Rank.Five));
      expect(shouldDealerHit(hand)).toBe(true);
    });
  });
});

