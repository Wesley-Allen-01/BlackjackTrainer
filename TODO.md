# Implementation TODO List

This document lists all implementation tasks in dependency order. Each task includes file paths, function signatures, tests, and estimated size.

## Task 1: Card Utilities
**Files**: `src/core/card.ts`  
**Functions to implement**:
- `createCard(suit: Suit, rank: Rank): Card`
- `getRankValue(rank: Rank): number`
- `areCardsEqual(card1: Card, card2: Card): boolean`
- `isAce(card: Card): boolean`
- `isFaceCard(card: Card): boolean`

**Tests**: `src/core/card.test.ts`  
**Size**: Small (≤30m)

---

## Task 2: Deck Management
**Files**: `src/core/deck.ts`  
**Functions to implement**:
- `Deck.shuffle(): void`
- `Deck.deal(): Card`
- `Deck.reshuffle(): void`
- `Deck.getRemainingCount(): number`

**Tests**: `src/core/deck.test.ts`  
**Size**: Small (≤30m)

---

## Task 3: Hand Scoring
**Files**: `src/core/hand.ts`  
**Functions to implement**:
- `Hand.addCard(card: Card): void`
- `Hand.getCards(): Card[]`
- `Hand.getHardTotal(): number`
- `Hand.getSoftTotal(): number | null`
- `Hand.getBestTotal(): number`
- `Hand.isBlackjack(): boolean`
- `Hand.isBusted(): boolean`
- `Hand.canSplit(): boolean`
- `Hand.getCardCount(): number`

**Tests**: `src/core/hand.test.ts`  
**Size**: Medium (≤60m)

---

## Task 4: Game State Management
**Files**: `src/core/gameState.ts`  
**Functions to implement**:
- `createInitialGameState(): GameState`
- `transitionToNewHand(state: GameState, playerCards: Card[], dealerCards: Card[]): GameState`
- `transitionToPlayerTurn(state: GameState): GameState`
- `transitionToDealerTurn(state: GameState): GameState`
- `transitionToResolveHand(state: GameState, result: HandResult): GameState`
- `addCardToPlayerHand(state: GameState, card: Card): GameState`
- `addCardToDealerHand(state: GameState, card: Card): GameState`
- `updateScore(state: GameState, result: HandResult): GameState`
- `recordBasicStrategyDecision(state: GameState, isCorrect: boolean): GameState`

**Tests**: `src/core/gameState.test.ts`  
**Size**: Medium (≤60m)

---

## Task 5: Action Validation
**Files**: `src/core/actions.ts`  
**Functions to implement**:
- `canHit(hand: Hand): boolean`
- `canStand(hand: Hand): boolean`
- `canDouble(hand: Hand): boolean`
- `canSplit(hand: Hand): boolean`
- `getAllowedActions(hand: Hand): Action[]`

**Tests**: `src/core/actions.test.ts`  
**Size**: Small (≤30m)

---

## Task 6: Dealer Logic
**Files**: `src/core/dealer.ts`  
**Functions to implement**:
- `shouldDealerHit(hand: Hand): boolean`

**Tests**: `src/core/dealer.test.ts`  
**Size**: Small (≤30m)

---

## Task 7: Outcome Resolution
**Files**: `src/core/outcome.ts`  
**Functions to implement**:
- `resolveHand(playerHand: Hand, dealerHand: Hand): HandResult`
- `calculateScore(result: HandResult): number`

**Tests**: `src/core/outcome.test.ts`  
**Size**: Medium (≤60m)

---

## Task 8: Basic Strategy Table
**Files**: `src/core/strategy/basicStrategy.ts`  
**Functions to implement**:
- `getDealerUpcardValue(card: Card): DealerUpcard` (helper)
- `getBasicStrategyTable(): StrategyTable` (fill in table values)
- `getPlayerSituation(hand: Hand, dealerUpcard: Card): PlayerSituation` (helper)
- `recommendAction(playerHand: Hand, dealerUpcard: Card, allowedActions: Action[]): Action`
- `isBasicStrategyCorrect(playerAction: Action, recommendedAction: Action): boolean`

**Tests**: `src/core/strategy/basicStrategy.test.ts`  
**Size**: Medium (≤60m) - Note: Filling in the strategy table will take additional time

---

## Notes

- All functions are currently stubbed with `throw new Error('TODO: ...')`
- Tests are written and will fail until implementations are complete
- Implement tasks in order due to dependencies
- Strategy table values need to be filled in manually (see Basic Strategy references)

