
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 15;
const CELL_SIZE = 15;
const INITIAL_SPEED = 150;

const SnakeGame: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 8, y: 8 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'UP' | 'RIGHT' | 'DOWN' | 'LEFT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const directionRef = useRef(direction);
  const speedRef = useRef(INITIAL_SPEED);
  const gameLoopRef = useRef<number | null>(null);
  const requestRef = useRef<number>();
  const lastUpdateTimeRef = useRef(0);

  // Update the direction reference when direction changes
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Generate a random position for food
  const generateFood = (currentSnake: Position[]): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    // Check if food is on the snake
    if (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood(currentSnake);
    }

    return newFood;
  };

  // Handle keyboard controls
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (directionRef.current !== 'DOWN') {
          setDirection('UP');
        }
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (directionRef.current !== 'LEFT') {
          setDirection('RIGHT');
        }
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (directionRef.current !== 'UP') {
          setDirection('DOWN');
        }
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (directionRef.current !== 'RIGHT') {
          setDirection('LEFT');
        }
        break;
      case ' ':
        if (!gameStarted) {
          setGameStarted(true);
          startGameLoop();
        }
        break;
      default:
        break;
    }
  };

  // Handle touch/button controls for mobile
  const handleDirectionButton = (newDirection: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT') => {
    if (
      (newDirection === 'UP' && directionRef.current !== 'DOWN') ||
      (newDirection === 'RIGHT' && directionRef.current !== 'LEFT') ||
      (newDirection === 'DOWN' && directionRef.current !== 'UP') ||
      (newDirection === 'LEFT' && directionRef.current !== 'RIGHT')
    ) {
      setDirection(newDirection);
    }
  };

  // Update game state
  const updateGame = () => {
    if (gameOver || !gameStarted) return;

    setSnake(currentSnake => {
      // Calculate new head position
      const head = { ...currentSnake[0] };

      switch (directionRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
      }

      // Check for collisions
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        currentSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
        return currentSnake;
      }

      const newSnake = [head, ...currentSnake];

      // Check if snake ate food
      if (head.x === food.x && head.y === food.y) {
        // Increase score
        setScore(s => s + 10);
        // Speed up slightly
        speedRef.current = Math.max(50, speedRef.current - 5);
        // Generate new food
        setFood(generateFood(newSnake));
      } else {
        // Remove tail if snake didn't eat
        newSnake.pop();
      }

      return newSnake;
    });
  };

  // Game loop using requestAnimationFrame for smoother animation
  const gameLoop = (timestamp: number) => {
    if (!lastUpdateTimeRef.current) lastUpdateTimeRef.current = timestamp;
    
    const elapsed = timestamp - lastUpdateTimeRef.current;
    
    if (elapsed > speedRef.current) {
      lastUpdateTimeRef.current = timestamp;
      updateGame();
    }
    
    // Continue the game loop
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // Start the game loop
  const startGameLoop = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // Draw the game on canvas
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid (optional)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Draw snake
    snake.forEach((segment, index) => {
      // Snake head - different color
      if (index === 0) {
        ctx.fillStyle = '#4ade80';
      } else {
        ctx.fillStyle = '#34d399';
      }
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
  };

  // Restart the game
  const restartGame = () => {
    setSnake([{ x: 8, y: 8 }]);
    setFood(generateFood([{ x: 8, y: 8 }]));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    speedRef.current = INITIAL_SPEED;
    lastUpdateTimeRef.current = 0;
  };

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Draw game when state changes
  useEffect(() => {
    drawGame();
  }, [snake, food, gameOver]);

  // Start button handler
  const handleStart = () => {
    setGameStarted(true);
    startGameLoop();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-2">
      <div className="text-center mb-2">
        <p className="text-lg">{t('games.snake.score')}: {score}</p>
        {gameOver && (
          <p className="text-red-500 animate-pulse mt-2">{t('games.snake.gameOver')}</p>
        )}
        {!gameStarted && !gameOver && (
          <p className="animate-pulse mt-2">
            {t('games.snake.pressSpace')}
          </p>
        )}
      </div>
      <div className="border border-current p-1">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="bg-terminal-dark"
        />
      </div>
      
      {/* Controls for touch devices */}
      <div className="grid grid-cols-3 gap-2 w-[180px] mt-2">
        <div></div>
        <button 
          onClick={() => handleDirectionButton('UP')}
          className="border border-current px-4 py-2 hover:bg-terminal-dark/50"
        >
          ↑
        </button>
        <div></div>
        
        <button 
          onClick={() => handleDirectionButton('LEFT')}
          className="border border-current px-4 py-2 hover:bg-terminal-dark/50"
        >
          ←
        </button>
        
        {!gameStarted && !gameOver ? (
          <button 
            onClick={handleStart}
            className="border border-current px-4 py-2 hover:bg-terminal-dark/50"
          >
            ▶
          </button>
        ) : (
          <div className="border border-current px-4 py-2 opacity-50 text-center">·</div>
        )}
        
        <button 
          onClick={() => handleDirectionButton('RIGHT')}
          className="border border-current px-4 py-2 hover:bg-terminal-dark/50"
        >
          →
        </button>
        
        <div></div>
        <button 
          onClick={() => handleDirectionButton('DOWN')}
          className="border border-current px-4 py-2 hover:bg-terminal-dark/50"
        >
          ↓
        </button>
        <div></div>
      </div>
      
      {gameOver && (
        <button
          onClick={restartGame}
          className="border border-current px-4 py-1 hover:bg-terminal-dark/50 transition-colors"
        >
          {t('games.snake.restart')}
        </button>
      )}
      <div className="text-xs text-center mt-4">
        <p>{t('games.snake.instructions')}</p>
        <p className="mt-1">{t('games.snake.controlsHelp')}</p>
      </div>
    </div>
  );
};

export default SnakeGame;
