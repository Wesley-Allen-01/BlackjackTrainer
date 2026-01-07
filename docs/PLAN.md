# Blackjack Trainer Architecture Plan

## Overview

This document describes the architecture and design decisions for the Blackjack Trainer application.

## Architecture

The application follows a layered architecture:

- **Core Engine** (`/src/core`): Framework-agnostic game logic modules with pure functions
- **UI Layer** (`/src/components`): React components that consume core engine
- **State Management**: React hooks managing game state transitions
- **Basic Strategy** (`/src/core/strategy`): Strategy recommendation engine

## State Machine

```
new_hand → player_turn → (hit/stand/double/split) → dealer_turn → resolve_hand → new_hand
```

### States

- `new_hand`: Initial deal, check for blackjacks
- `player_turn`: Player makes decisions (hit/stand/double/split)
- `dealer_turn`: Dealer draws according to rules
- `resolve_hand`: Calculate outcome, update score, show feedback

## Rules Assumptions

- **Dealer**: Stands on Soft 17 (S17)
- **Double**: Allowed only on first decision of a hand (first two cards)
- **Split**: Allowed when first two cards have same rank
- **Deck**: Single deck (52 cards), reshuffled after each hand
- **Blackjack**: Pays 3:2 (handled in outcome resolution)
- **No insurance, surrender, or side bets**

## Module Dependencies

```
card → deck → hand → gameState
                    ↓
                  actions, dealer, outcome
                    ↓
                  strategy (uses hand, actions)
                    ↓
                  UI (uses all core modules)
```

## Core Modules

### card.ts
- Types: `Suit`, `Rank`, `Card`
- Utilities: `createCard()`, `getRankValue()`, `areCardsEqual()`, `isAce()`, `isFaceCard()`

### deck.ts
- `Deck` class: `shuffle()`, `deal()`, `reshuffle()`, `getRemainingCount()`
- Reshuffles after each hand completes

### hand.ts
- `Hand` class: `addCard()`, `getHardTotal()`, `getSoftTotal()`, `getBestTotal()`, `isBlackjack()`, `isBusted()`, `canSplit()`, `getCardCount()`
- Handles ace soft/hard logic

### gameState.ts
- State types: `GamePhase`, `GameState`, `HandResult`
- State transitions: `transitionToNewHand()`, `transitionToPlayerTurn()`, `transitionToDealerTurn()`, `transitionToResolveHand()`
- State updates: `addCardToPlayerHand()`, `addCardToDealerHand()`, `updateScore()`, `recordBasicStrategyDecision()`

### actions.ts
- Action types: `Hit`, `Stand`, `Double`, `Split`
- Validation: `canHit()`, `canStand()`, `canDouble()`, `canSplit()`, `getAllowedActions()`

### dealer.ts
- `shouldDealerHit()`: Dealer drawing rules (S17)

### outcome.ts
- `resolveHand()`: Calculate win/loss/push
- `calculateScore()`: +10/-10/0 based on outcome

## Basic Strategy Module

### strategy/types.ts
- `StrategyTable` type (hard totals, soft totals, pairs)
- `PlayerSituation` type
- Dealer upcard and total types

### strategy/basicStrategy.ts
- `getBasicStrategyTable()`: Returns hardcoded strategy table (user fills values)
- `recommendAction()`: Looks up recommended action from table
- `isBasicStrategyCorrect()`: Compares player action to recommendation

## UI Components

### Table.tsx
- Main game table layout
- Manages game state via hooks
- Handles player actions and dealer logic
- Coordinates all game flow

### Card.tsx
- Card display (suit + rank)
- Face down card for dealer hole card

### Actions.tsx
- Action buttons (Hit/Stand/Double/Split)
- Disabled state based on validation

### StatusPanel.tsx
- Current score
- Hand result
- Basic strategy correctness %
- Last decision feedback

## Testing Strategy

- Unit tests for all core modules (Vitest)
- Tests should fail initially because functions are stubs
- Each test documents expected behavior for TODO implementation
- No integration/E2E tests in scaffolding (user can add later)

## Design Decisions

1. **Pure Functions**: Core logic is framework-agnostic, testable independently
2. **State Machine**: Explicit game phases prevent invalid state transitions
3. **Strategy Separation**: Basic Strategy module isolated for easy modification
4. **Test-First**: Each TODO has corresponding failing tests that define behavior
5. **Type Safety**: Comprehensive TypeScript types for all game entities

