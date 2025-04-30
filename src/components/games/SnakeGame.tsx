
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

  // Mettre à jour la référence de direction lorsque direction change
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Générer une position aléatoire pour la nourriture
  const generateFood = (currentSnake: Position[]): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    // Vérifier si la nourriture est sur le serpent
    if (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood(currentSnake);
    }

    return newFood;
  };

  // Gestionnaire de clavier pour contrôler le serpent
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current !== 'DOWN') {
          setDirection('UP');
        }
        break;
      case 'ArrowRight':
        if (directionRef.current !== 'LEFT') {
          setDirection('RIGHT');
        }
        break;
      case 'ArrowDown':
        if (directionRef.current !== 'UP') {
          setDirection('DOWN');
        }
        break;
      case 'ArrowLeft':
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

  // Mettre à jour le jeu à chaque frame
  const updateGame = () => {
    if (gameOver || !gameStarted) return;

    setSnake(currentSnake => {
      // Calculer la nouvelle tête du serpent
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

      // Vérifier si le serpent est sorti de la grille ou s'est mordu lui-même
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        currentSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
        return currentSnake;
      }

      const newSnake = [head, ...currentSnake];

      // Vérifier si le serpent a mangé la nourriture
      if (head.x === food.x && head.y === food.y) {
        // Augmenter le score
        setScore(s => s + 10);
        // Accélérer légèrement
        speedRef.current = Math.max(50, speedRef.current - 5);
        // Générer une nouvelle nourriture
        setFood(generateFood(newSnake));
      } else {
        // Retirer la queue si le serpent n'a pas mangé
        newSnake.pop();
      }

      return newSnake;
    });
  };

  // Boucle de jeu principale
  const startGameLoop = () => {
    let lastTime = 0;
    const gameLoop = (timestamp: number) => {
      if (timestamp - lastTime >= speedRef.current) {
        lastTime = timestamp;
        updateGame();
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  // Dessiner le jeu dans le canvas
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la grille (facultatif)
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

    // Dessiner la nourriture
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Dessiner le serpent
    snake.forEach((segment, index) => {
      // Tête du serpent - couleur différente
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

  // Redémarrer le jeu
  const restartGame = () => {
    setSnake([{ x: 8, y: 8 }]);
    setFood(generateFood([{ x: 8, y: 8 }]));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    speedRef.current = INITIAL_SPEED;
  };

  // Configurer les écouteurs d'événements
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  // Dessiner le jeu à chaque changement d'état
  useEffect(() => {
    drawGame();
  }, [snake, food, gameOver]);

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
      </div>
    </div>
  );
};

export default SnakeGame;
