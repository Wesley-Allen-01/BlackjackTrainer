import { useState, useEffect } from 'react';
import { Deck } from '../core/deck';
import {
  GameState,
  GamePhase,
  createInitialGameState,
  transitionToNewHand,
  transitionToPlayerTurn,
  transitionToDealerTurn,
  transitionToResolveHand,
  addCardToPlayerHand,
  addCardToDealerHand,
  updateScore,
  recordBasicStrategyDecision,
  HandResult,
} from '../core/gameState';
import { Action, getAllowedActions } from '../core/actions';
import { shouldDealerHit } from '../core/dealer';
import { resolveHand, calculateScore } from '../core/outcome';
import { recommendAction, isBasicStrategyCorrect } from '../core/strategy/basicStrategy';
import { Card } from './Card';
import { Actions } from './Actions';
import { StatusPanel } from './StatusPanel';
import './Table.css';

export function Table() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [deck] = useState(() => new Deck());
  const [lastDecisionFeedback, setLastDecisionFeedback] = useState<string | null>(null);

  // Start a new hand
  const startNewHand = () => {
    deck.reshuffle();
    const playerCards = [deck.deal(), deck.deal()];
    const dealerCards = [deck.deal(), deck.deal()];
    
    let newState = createInitialGameState();
    newState = transitionToNewHand(newState, playerCards, dealerCards);
    
    // Check for immediate blackjacks
    if (newState.playerHand.isBlackjack() || newState.dealerHand.isBlackjack()) {
      const result = resolveHand(newState.playerHand, newState.dealerHand);
      newState = transitionToResolveHand(newState, result);
      newState = updateScore(newState, result);
    } else {
      newState = transitionToPlayerTurn(newState);
    }
    
    setGameState(newState);
    setLastDecisionFeedback(null);
  };

  // Handle player action
  const handlePlayerAction = (action: Action) => {
    if (gameState.phase !== GamePhase.PlayerTurn) return;

    let newState = { ...gameState };
    const allowedActions = getAllowedActions(gameState.playerHand);
    
    // Get basic strategy recommendation
    const recommendedAction = recommendAction(
      gameState.playerHand,
      gameState.dealerUpcard!,
      allowedActions
    );
    const isCorrect = isBasicStrategyCorrect(action, recommendedAction);
    
    // Record decision
    newState = recordBasicStrategyDecision(newState, isCorrect);
    
    // Provide feedback
    if (isCorrect) {
      setLastDecisionFeedback(`✓ Correct! Basic strategy recommends ${recommendedAction}`);
    } else {
      setLastDecisionFeedback(`✗ Incorrect. Basic strategy recommends ${recommendedAction}`);
    }

    // Execute action
    if (action === Action.Hit) {
      const card = deck.deal();
      newState = addCardToPlayerHand(newState, card);
      
      if (newState.playerHand.isBusted()) {
        const result = HandResult.DealerWin;
        newState = transitionToResolveHand(newState, result);
        newState = updateScore(newState, result);
      }
    } else if (action === Action.Stand) {
      newState = transitionToDealerTurn(newState);
      // Dealer draws cards
      while (shouldDealerHit(newState.dealerHand) && !newState.dealerHand.isBusted()) {
        const card = deck.deal();
        newState = addCardToDealerHand(newState, card);
      }
      
      // Resolve hand
      const result = resolveHand(newState.playerHand, newState.dealerHand);
      newState = transitionToResolveHand(newState, result);
      newState = updateScore(newState, result);
    } else if (action === Action.Double) {
      const card = deck.deal();
      newState = addCardToPlayerHand(newState, card);
      
      if (newState.playerHand.isBusted()) {
        const result = HandResult.DealerWin;
        newState = transitionToResolveHand(newState, result);
        newState = updateScore(newState, result);
      } else {
        newState = transitionToDealerTurn(newState);
        // Dealer draws cards
        while (shouldDealerHit(newState.dealerHand) && !newState.dealerHand.isBusted()) {
          const card = deck.deal();
          newState = addCardToDealerHand(newState, card);
        }
        
        // Resolve hand
        const result = resolveHand(newState.playerHand, newState.dealerHand);
        newState = transitionToResolveHand(newState, result);
        newState = updateScore(newState, result);
      }
    } else if (action === Action.Split) {
      // TODO: Implement split logic
      setLastDecisionFeedback('Split not yet implemented');
    }

    setGameState(newState);
  };

  // Calculate basic strategy correctness percentage
  const basicStrategyCorrectness =
    gameState.basicStrategyStats.totalDecisions > 0
      ? (gameState.basicStrategyStats.correctDecisions /
          gameState.basicStrategyStats.totalDecisions) *
        100
      : 0;

  // Start first hand on mount
  useEffect(() => {
    startNewHand();
  }, []);

  const showDealerHoleCard = gameState.phase === GamePhase.ResolveHand;

  return (
    <div className="table">
      <h1>Blackjack Trainer</h1>
      
      <div className="game-area">
        <div className="dealer-area">
          <h2>Dealer</h2>
          <div className="hand">
            {gameState.dealerHand.getCards().map((card, index) => (
              <Card
                key={index}
                card={index === 1 && !showDealerHoleCard ? null : card}
                faceDown={index === 1 && !showDealerHoleCard}
              />
            ))}
          </div>
          {gameState.phase === GamePhase.ResolveHand && (
            <div className="hand-total">
              Total: {gameState.dealerHand.getBestTotal()}
            </div>
          )}
        </div>

        <div className="player-area">
          <h2>Player</h2>
          <div className="hand">
            {gameState.playerHand.getCards().map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
          <div className="hand-total">
            Total: {gameState.playerHand.getBestTotal()}
          </div>
        </div>
      </div>

      {gameState.phase === GamePhase.PlayerTurn && (
        <Actions
          allowedActions={getAllowedActions(gameState.playerHand)}
          onAction={handlePlayerAction}
        />
      )}

      {gameState.phase === GamePhase.ResolveHand && (
        <button className="new-hand-button" onClick={startNewHand}>
          New Hand
        </button>
      )}

      <StatusPanel
        score={gameState.score}
        handResult={gameState.handResult}
        basicStrategyCorrectness={basicStrategyCorrectness}
        lastDecisionFeedback={lastDecisionFeedback}
      />
    </div>
  );
}

