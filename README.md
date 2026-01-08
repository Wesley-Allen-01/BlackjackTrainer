# Blackjack Trainer

A browser-based Blackjack game trainer that helps players learn and practice Basic Strategy.

## Features

- ✅ Fully playable Blackjack game (one player vs dealer)
- ✅ Score tracking: +10 per win, -10 per loss, 0 on push
- ✅ Basic Strategy trainer: provides real-time feedback on whether your decisions match optimal play
- ✅ Basic Strategy correctness tracking: percentage of decisions matching Basic Strategy
- ✅ Complete Basic Strategy table implementation
- ✅ Comprehensive test suite (127 tests, all passing)

## Rules

- Single deck (52 cards), reshuffled after each hand
- Dealer stands on Soft 17 (S17)
- Double allowed only on first decision (first two cards)
- Split functionality: planned but not yet implemented
- No insurance, surrender, or side bets

## Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens the app at `http://localhost:5173`

### Testing

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── core/                    # Framework-agnostic game logic (fully tested)
│   ├── card.ts             # Card types and utilities
│   ├── deck.ts             # Deck management and shuffling
│   ├── hand.ts             # Hand scoring (hard/soft totals, blackjack detection)
│   ├── gameState.ts        # State machine and transitions
│   ├── actions.ts          # Action validation (hit, stand, double, split)
│   ├── dealer.ts           # Dealer drawing rules (S17)
│   ├── outcome.ts          # Outcome resolution and score calculation
│   └── strategy/           # Basic Strategy module
│       ├── basicStrategy.ts # Complete strategy table and recommendations
│       └── types.ts        # Strategy type definitions
├── components/             # React UI components
│   ├── Table.tsx           # Main game table and state management
│   ├── Card.tsx            # Card display component
│   ├── Actions.tsx         # Action buttons (Hit/Stand/Double/Split)
│   └── StatusPanel.tsx     # Score, stats, and feedback display
├── App.tsx                 # Main app component
└── main.tsx                # Application entry point
```

All core modules include comprehensive unit tests (`.test.ts` files).


**Known Limitations:**
- Split action is not yet implemented (UI shows feedback message when attempted)

See `TODO.md` for the original implementation plan (now mostly complete).

