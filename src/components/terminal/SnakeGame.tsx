import React, { useState, useEffect, useRef } from 'react';
import { getHighScore, updateHighScore } from '@/utils/highscores';

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onQuit: () => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame: React.FC<SnakeGameProps> = ({ onQuit }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setHighScore(getHighScore('snake'));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      updateHighScore('snake', score);
    }
  }, [score, highScore]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  // Gestion des touches
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'q') {
        onQuit();
        return;
      }

      if (e.key === ' ') {
        setIsPaused(prev => !prev);
        return;
      }

      if (e.key.toLowerCase() === 'e') {
        resetGame();
        return;
      }

      if (isPaused || gameOver) return;

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 's':
        case 'arrowdown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'a':
        case 'arrowleft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'd':
        case 'arrowright':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPaused, gameOver, onQuit]);

  // Génération de nourriture
  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  };

  // Boucle de jeu
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prev => {
        const head = { ...prev[0] };

        switch (direction) {
          case 'UP':
            head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            head.y = (head.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            head.x = (head.x + 1) % GRID_SIZE;
            break;
        }

        // Vérification de collision avec le corps
        if (prev.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head];
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          generateFood();
          newSnake.push(...prev);
        } else {
          newSnake.push(...prev.slice(0, -1));
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [direction, food, gameOver, isPaused]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="text-green-500">Score: {score}</div>
          <div className="text-yellow-500">Record: {highScore}</div>
        </div>
        {isPaused && <div className="text-yellow-500">Pause</div>}
      </div>
      <div 
        className="border border-gray-700 bg-black rounded-lg shadow-lg relative"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          position: 'relative'
        }}
      >
        {/* Nourriture */}
        <div
          className="absolute bg-red-500 rounded-full animate-pulse"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
          }}
        />
        {/* Serpent */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute rounded-sm transition-all duration-100 ${
              index === 0 
                ? 'bg-green-500' 
                : 'bg-green-400'
            }`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              boxShadow: '0 0 5px rgba(34, 197, 94, 0.3)',
              transform: index === 0 ? `rotate(${
                direction === 'UP' ? 0 :
                direction === 'RIGHT' ? 90 :
                direction === 'DOWN' ? 180 : 270
              }deg)` : 'none'
            }}
          />
        ))}
        {/* Écran de Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center">
            <div className="text-red-500 text-4xl font-bold mb-4 animate-pulse">
              GAME OVER
            </div>
            <div className="text-green-500 text-2xl mb-4">
              Score: {score}
            </div>
            <div className="text-gray-400 text-sm space-y-2">
              <div>Appuyez sur Q pour quitter</div>
              <div>Appuyez sur E pour recommencer</div>
            </div>
          </div>
        )}
      </div>
      <div className="text-gray-400 text-sm">
        Contrôles: WASD pour diriger, Espace pour pause, Q pour quitter, E pour recommencer
      </div>
    </div>
  );
};

export default SnakeGame; 