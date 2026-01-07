import { describe, it, expect, beforeEach } from 'vitest';
import {
  GamePhase,
  HandResult,
  createInitialGameState,
  transitionToNewHand,
  transitionToPlayerTurn,
  transitionToDealerTurn,
  transitionToResolveHand,
  addCardToPlayerHand,
  addCardToDealerHand,
  updateScore,
  recordBasicStrategyDecision,
  type GameState,
} from './gameState';
import { Hand } from './hand';
import { Suit, Rank, createCard } from './card';

describe('gameState', () => {
  describe('createInitialGameState', () => {
    it('should create state with new_hand phase', () => {
      const state = createInitialGameState();
      expect(state.phase).toBe(GamePhase.NewHand);
    });

    it('should initialize empty hands', () => {
      const state = createInitialGameState();
      expect(state.playerHand.getCardCount()).toBe(0);
      expect(state.dealerHand.getCardCount()).toBe(0);
    });

    it('should initialize score to 0', () => {
      const state = createInitialGameState();
      expect(state.score).toBe(0);
    });

    it('should initialize basic strategy stats', () => {
      const state = createInitialGameState();
      expect(state.basicStrategyStats.totalDecisions).toBe(0);
      expect(state.basicStrategyStats.correctDecisions).toBe(0);
    });

    it('should initialize dealerUpcard as null', () => {
      const state = createInitialGameState();
      expect(state.dealerUpcard).toBeNull();
    });

    it('should initialize handResult as null', () => {
      const state = createInitialGameState();
      expect(state.handResult).toBeNull();
    });
  });

  describe('transitionToNewHand', () => {
    it('should deal cards to player and dealer', () => {
      const state = createInitialGameState();
      const playerCards = [
        createCard(Suit.Hearts, Rank.Ace),
        createCard(Suit.Spades, Rank.King),
      ];
      const dealerCards = [
        createCard(Suit.Diamonds, Rank.Seven),
        createCard(Suit.Clubs, Rank.Eight),
      ];

      const newState = transitionToNewHand(state, playerCards, dealerCards);

      expect(newState.playerHand.getCardCount()).toBe(2);
      expect(newState.dealerHand.getCardCount()).toBe(2);
      expect(newState.phase).toBe(GamePhase.NewHand);
    });

    it('should set dealer upcard to first dealer card', () => {
      const state = createInitialGameState();
      const dealerCards = [
        createCard(Suit.Diamonds, Rank.Seven),
        createCard(Suit.Clubs, Rank.Eight),
      ];

      const newState = transitionToNewHand(state, [], dealerCards);
      expect(newState.dealerUpcard).toEqual(dealerCards[0]);
    });
  });

  describe('transitionToPlayerTurn', () => {
    it('should change phase to player_turn', () => {
      const state = createInitialGameState();
      const newState = transitionToPlayerTurn(state);
      expect(newState.phase).toBe(GamePhase.PlayerTurn);
    });
  });

  describe('transitionToDealerTurn', () => {
    it('should change phase to dealer_turn', () => {
      const state = createInitialGameState();
      const newState = transitionToDealerTurn(state);
      expect(newState.phase).toBe(GamePhase.DealerTurn);
    });
  });

  describe('transitionToResolveHand', () => {
    it('should change phase to resolve_hand and set result', () => {
      const state = createInitialGameState();
      const newState = transitionToResolveHand(state, HandResult.PlayerWin);
      expect(newState.phase).toBe(GamePhase.ResolveHand);
      expect(newState.handResult).toBe(HandResult.PlayerWin);
    });
  });

  describe('addCardToPlayerHand', () => {
    it('should add card to player hand', () => {
      const state = createInitialGameState();
      const card = createCard(Suit.Hearts, Rank.Ace);
      const newState = addCardToPlayerHand(state, card);
      expect(newState.playerHand.getCardCount()).toBe(1);
    });

    it('should not modify original state', () => {
      const state = createInitialGameState();
      const card = createCard(Suit.Hearts, Rank.Ace);
      addCardToPlayerHand(state, card);
      expect(state.playerHand.getCardCount()).toBe(0);
    });
  });

  describe('addCardToDealerHand', () => {
    it('should add card to dealer hand', () => {
      const state = createInitialGameState();
      const card = createCard(Suit.Hearts, Rank.Ace);
      const newState = addCardToDealerHand(state, card);
      expect(newState.dealerHand.getCardCount()).toBe(1);
    });

    it('should not modify original state', () => {
      const state = createInitialGameState();
      const card = createCard(Suit.Hearts, Rank.Ace);
      addCardToDealerHand(state, card);
      expect(state.dealerHand.getCardCount()).toBe(0);
    });
  });

  describe('updateScore', () => {
    it('should add 10 for player win', () => {
      const state = createInitialGameState();
      const newState = updateScore(state, HandResult.PlayerWin);
      expect(newState.score).toBe(10);
    });

    it('should subtract 10 for dealer win', () => {
      const state = createInitialGameState();
      const newState = updateScore(state, HandResult.DealerWin);
      expect(newState.score).toBe(-10);
    });

    it('should not change score for push', () => {
      const state = createInitialGameState();
      const newState = updateScore(state, HandResult.Push);
      expect(newState.score).toBe(0);
    });

    it('should accumulate score correctly', () => {
      let state = createInitialGameState();
      state = updateScore(state, HandResult.PlayerWin);
      state = updateScore(state, HandResult.PlayerWin);
      state = updateScore(state, HandResult.DealerWin);
      expect(state.score).toBe(10);
    });
  });

  describe('recordBasicStrategyDecision', () => {
    it('should increment total decisions', () => {
      const state = createInitialGameState();
      const newState = recordBasicStrategyDecision(state, true);
      expect(newState.basicStrategyStats.totalDecisions).toBe(1);
    });

    it('should increment correct decisions when decision is correct', () => {
      const state = createInitialGameState();
      const newState = recordBasicStrategyDecision(state, true);
      expect(newState.basicStrategyStats.correctDecisions).toBe(1);
    });

    it('should not increment correct decisions when decision is incorrect', () => {
      const state = createInitialGameState();
      const newState = recordBasicStrategyDecision(state, false);
      expect(newState.basicStrategyStats.correctDecisions).toBe(0);
      expect(newState.basicStrategyStats.totalDecisions).toBe(1);
    });

    it('should accumulate stats correctly', () => {
      let state = createInitialGameState();
      state = recordBasicStrategyDecision(state, true);
      state = recordBasicStrategyDecision(state, false);
      state = recordBasicStrategyDecision(state, true);
      
      expect(state.basicStrategyStats.totalDecisions).toBe(3);
      expect(state.basicStrategyStats.correctDecisions).toBe(2);
    });
  });
});

