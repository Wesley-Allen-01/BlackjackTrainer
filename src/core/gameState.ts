import { Hand } from './hand';
import { Card } from './card';

/**
 * GameState module - manages game state machine and transitions
 */

export enum GamePhase {
  NewHand = 'new_hand',
  PlayerTurn = 'player_turn',
  DealerTurn = 'dealer_turn',
  ResolveHand = 'resolve_hand',
}

export interface GameState {
  phase: GamePhase;
  playerHand: Hand;
  dealerHand: Hand;
  dealerUpcard: Card | null;
  score: number;
  handResult: HandResult | null;
  basicStrategyStats: {
    totalDecisions: number;
    correctDecisions: number;
  };
}

export enum HandResult {
  PlayerWin = 'player_win',
  DealerWin = 'dealer_win',
  Push = 'push',
  PlayerBlackjack = 'player_blackjack',
  DealerBlackjack = 'dealer_blackjack',
}

/**
 * TODO: Create initial game state
 * @returns A new GameState with phase 'new_hand' and empty hands
 */
export function createInitialGameState(): GameState {
  return {
    phase: GamePhase.NewHand,
    playerHand: new Hand(),
    dealerHand: new Hand(),
    dealerUpcard: null,
    score: 0,
    handResult: null,
    basicStrategyStats: { totalDecisions: 0, correctDecisions: 0 },
  };
}

/**
 * TODO: Transition to new hand phase
 * Should deal initial cards: 2 to player, 2 to dealer (one face down)
 * @param state - Current game state
 * @param playerCards - Cards to deal to player
 * @param dealerCards - Cards to deal to dealer
 * @returns New game state in 'new_hand' phase
 */
export function transitionToNewHand(
  state: GameState,
  playerCards: Card[],
  dealerCards: Card[]
): GameState {
  state.playerHand = new Hand();
  state.dealerHand = new Hand();
  state.playerHand.addCard(playerCards[0]);
  state.playerHand.addCard(playerCards[1]);
  state.dealerHand.addCard(dealerCards[0]);
  state.dealerHand.addCard(dealerCards[1]);
  state.dealerUpcard = dealerCards[0];
  return state;
}

/**
 * TODO: Transition to player turn phase
 * @param state - Current game state
 * @returns New game state in 'player_turn' phase
 */
export function transitionToPlayerTurn(state: GameState): GameState {
  state.phase = GamePhase.PlayerTurn;
  return state;
}

/**
 * TODO: Transition to dealer turn phase
 * @param state - Current game state
 * @returns New game state in 'dealer_turn' phase
 */
export function transitionToDealerTurn(state: GameState): GameState {
  state.phase = GamePhase.DealerTurn;
  return state;
}

/**
 * TODO: Transition to resolve hand phase
 * @param state - Current game state
 * @param result - The result of the hand
 * @returns New game state in 'resolve_hand' phase with result
 */
export function transitionToResolveHand(
  state: GameState,
  result: HandResult
): GameState {
  state.phase = GamePhase.ResolveHand;
  state.handResult = result;
  return state;
}

/**
 * TODO: Add a card to player hand
 * @param state - Current game state
 * @param card - Card to add
 * @returns New game state with card added to player hand
 */
export function addCardToPlayerHand(state: GameState, card: Card): GameState {
  const newState = { ...state };
  const newHand = new Hand();
  newHand.addCard(card);
  state.playerHand.getCards().forEach(card => newHand.addCard(card));
  newState.playerHand = newHand;
  return newState;
}

/**
 * TODO: Add a card to dealer hand
 * @param state - Current game state
 * @param card - Card to add
 * @returns New game state with card added to dealer hand
 */
export function addCardToDealerHand(state: GameState, card: Card): GameState {
  const newState = { ...state };
  const newHand = new Hand();
  newHand.addCard(card);
  state.dealerHand.getCards().forEach(card => newHand.addCard(card));
  newState.dealerHand = newHand;
  return newState;
}

/**
 * TODO: Update score based on hand result
 * +10 for win, -10 for loss, 0 for push
 * @param state - Current game state
 * @param result - Hand result
 * @returns New game state with updated score
 */
export function updateScore(state: GameState, result: HandResult): GameState {
  const newState = { ...state };
  if (result === HandResult.PlayerWin) {
    newState.score += 10;
  } else if (result === HandResult.DealerWin) {
    newState.score -= 10;
  } else if (result === HandResult.Push) {
    newState.score += 0;
  }
  return newState;
}

/**
 * TODO: Record a basic strategy decision
 * @param state - Current game state
 * @param isCorrect - Whether the decision was correct
 * @returns New game state with updated basic strategy stats
 */
export function recordBasicStrategyDecision(
  state: GameState,
  isCorrect: boolean
): GameState {
  const newState = { ...state };
  newState.basicStrategyStats.totalDecisions++;
  if (isCorrect) {
    newState.basicStrategyStats.correctDecisions++;
  }
  return newState;
}

