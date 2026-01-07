import { Action } from '../core/actions';
import './Actions.css';

interface ActionsProps {
  allowedActions: Action[];
  onAction: (action: Action) => void;
}

export function Actions({ allowedActions, onAction }: ActionsProps) {
  const actionLabels: Record<Action, string> = {
    [Action.Hit]: 'Hit',
    [Action.Stand]: 'Stand',
    [Action.Double]: 'Double',
    [Action.Split]: 'Split',
  };

  return (
    <div className="actions">
      {Object.values(Action).map((action) => {
        const isEnabled = allowedActions.includes(action);
        return (
          <button
            key={action}
            className={`action-button ${isEnabled ? 'enabled' : 'disabled'}`}
            onClick={() => isEnabled && onAction(action)}
            disabled={!isEnabled}
          >
            {actionLabels[action]}
          </button>
        );
      })}
    </div>
  );
}

