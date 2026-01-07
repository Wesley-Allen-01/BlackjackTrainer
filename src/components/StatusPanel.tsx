import { HandResult } from '../core/gameState';
import './StatusPanel.css';

interface StatusPanelProps {
  score: number;
  handResult: HandResult | null;
  basicStrategyCorrectness: number; // Percentage (0-100)
  lastDecisionFeedback: string | null;
}

export function StatusPanel({
  score,
  handResult,
  basicStrategyCorrectness,
  lastDecisionFeedback,
}: StatusPanelProps) {
  const resultLabels: Record<HandResult, string> = {
    [HandResult.PlayerWin]: 'You Win!',
    [HandResult.DealerWin]: 'Dealer Wins',
    [HandResult.Push]: 'Push',
    [HandResult.PlayerBlackjack]: 'Blackjack!',
    [HandResult.DealerBlackjack]: 'Dealer Blackjack',
  };

  return (
    <div className="status-panel">
      <div className="status-item">
        <span className="status-label">Score:</span>
        <span className="status-value">{score}</span>
      </div>

      {handResult && (
        <div className="status-item">
          <span className="status-label">Result:</span>
          <span className={`status-value ${handResult === HandResult.PlayerWin || handResult === HandResult.PlayerBlackjack ? 'win' : handResult === HandResult.DealerWin || handResult === HandResult.DealerBlackjack ? 'loss' : ''}`}>
            {resultLabels[handResult]}
          </span>
        </div>
      )}

      <div className="status-item">
        <span className="status-label">Basic Strategy:</span>
        <span className="status-value">{basicStrategyCorrectness.toFixed(1)}%</span>
      </div>

      {lastDecisionFeedback && (
        <div className="status-item feedback">
          <span className="feedback-text">{lastDecisionFeedback}</span>
        </div>
      )}
    </div>
  );
}

