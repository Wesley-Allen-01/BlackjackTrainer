# Blackjack Trainer

A browser-based Blackjack game trainer that helps players learn and practice Basic Strategy.

## Features

- Playable Blackjack game (one player vs dealer)
- Score tracking: +10 per win, -10 per loss, 0 on push
- Basic Strategy trainer: provides feedback on whether your decisions match optimal play
- Basic Strategy correctness tracking: percentage of decisions matching Basic Strategy

## Rules

- Single deck (52 cards), reshuffled after each hand
- Dealer stands on Soft 17 (S17)
- Double allowed only on first decision (first two cards)
- Split allowed when first two cards have same rank
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
├── core/              # Framework-agnostic game logic
│   ├── card.ts       # Card types and utilities
│   ├── deck.ts       # Deck management
│   ├── hand.ts       # Hand scoring
│   ├── gameState.ts  # State machine
│   ├── actions.ts    # Action validation
│   ├── dealer.ts     # Dealer drawing rules
│   ├── outcome.ts    # Outcome resolution
│   └── strategy/     # Basic Strategy module
├── components/       # React UI components
└── App.tsx          # Main app component
```

## Implementation Status

This is a scaffolding project. Core game logic functions are stubbed with TODOs. See `TODO.md` for implementation tasks.

## License

MIT

