import { type Card as CardType, Suit, Rank } from '../core/card';
import './Card.css';

interface CardProps {
  card: CardType | null;
  faceDown?: boolean;
}

export function Card({ card, faceDown = false }: CardProps) {
  if (faceDown || !card) {
    return (
      <div className="card card-face-down">
        <div className="card-back">🂠</div>
      </div>
    );
  }

  const suitSymbols: Record<Suit, string> = {
    [Suit.Hearts]: '♥',
    [Suit.Diamonds]: '♦',
    [Suit.Clubs]: '♣',
    [Suit.Spades]: '♠',
  };

  const isRed = card.suit === Suit.Hearts || card.suit === Suit.Diamonds;
  const suitSymbol = suitSymbols[card.suit];

  return (
    <div className={`card ${isRed ? 'card-red' : 'card-black'}`}>
      <div className="card-rank">{card.rank}</div>
      <div className="card-suit">{suitSymbol}</div>
    </div>
  );
}

