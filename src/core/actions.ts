import { type Hand } from './hand';
import { type GameState } from './gameState';

/**
 * Actions module - defines player actions and validation
 */

export enum Action {
  Hit = 'hit',
  Stand = 'stand',
  Double = 'double',
  Split = 'split',
}

/**
 * TODO: Check if player can hit
 * Player can hit if hand is not busted and not blackjack
 * @param hand - Player's hand
 * @returns True if hit is allowed
 */
export function canHit(hand: Hand): boolean {
  throw new Error('TODO: Implement canHit');
}

/**
 * TODO: Check if player can stand
 * Player can always stand (even if busted, though it's pointless)
 * @param hand - Player's hand
 * @returns True if stand is allowed
 */
export function canStand(hand: Hand): boolean {
  throw new Error('TODO: Implement canStand');
}

/**
 * TODO: Check if player can double
 * Double is only allowed on first decision (exactly 2 cards) and hand not busted
 * @param hand - Player's hand
 * @returns True if double is allowed
 */
export function canDouble(hand: Hand): boolean {
  throw new Error('TODO: Implement canDouble');
}

/**
 * TODO: Check if player can split
 * Split is allowed when hand has exactly 2 cards of the same rank
 * @param hand - Player's hand
 * @returns True if split is allowed
 */
export function canSplit(hand: Hand): boolean {
  throw new Error('TODO: Implement canSplit');
}

/**
 * TODO: Get all allowed actions for current hand
 * @param hand - Player's hand
 * @returns Array of allowed actions
 */
export function getAllowedActions(hand: Hand): Action[] {
  throw new Error('TODO: Implement getAllowedActions');
}

