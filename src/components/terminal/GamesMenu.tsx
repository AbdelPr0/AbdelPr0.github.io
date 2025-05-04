import React, { useState, useEffect } from 'react';
import SnakeGame from './SnakeGame';
import TetrisGame from './TetrisGame';
import { getHighScore } from '@/utils/highscores';

interface Game {
  id: string;
  name: string;
  component: React.ReactNode;
  description: string;
}

const GamesMenu: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [highScores, setHighScores] = useState({ snake: 0, tetris: 0 });

  useEffect(() => {
    setHighScores({
      snake: getHighScore('snake'),
      tetris: getHighScore('tetris')
    });
  }, [selectedGame]); // Mise à jour quand on revient au menu

  const games: Game[] = [
    {
      id: 'snake',
      name: '🐍 Snake',
      component: <SnakeGame onQuit={() => setSelectedGame(null)} />,
      description: 'Le classique jeu du serpent'
    },
    {
      id: 'tetris',
      name: '🟦 Tetris',
      component: <TetrisGame onQuit={() => setSelectedGame(null)} />,
      description: 'Le célèbre jeu de blocs'
    }
  ];

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    return game ? (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSelectedGame(null)}
            className="text-gray-400 hover:text-gray-300"
          >
            ← Retour
          </button>
          <div className="text-green-500">{game.name}</div>
        </div>
        {game.component}
      </div>
    ) : null;
  }

  return (
    <div className="space-y-4">
      <div className="text-green-500 mb-4">🎮 Jeux Rétro</div>
      <div className="grid gap-2">
        {games.map(game => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className="flex items-center justify-between p-2 hover:bg-gray-800 rounded border border-gray-700"
          >
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">{game.name}</span>
              <span className="text-gray-400 text-sm">→ {game.description}</span>
            </div>
            <div className="text-green-500 text-sm">
              Record: {highScores[game.id as keyof typeof highScores]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamesMenu; 