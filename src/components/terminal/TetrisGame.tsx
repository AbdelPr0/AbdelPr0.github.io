import React, { useState, useEffect, useRef } from 'react';
import { getHighScore, updateHighScore } from '@/utils/highscores';

interface TetrisGameProps {
  onQuit: () => void;
}

type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

interface Tetromino {
  type: TetrominoType;
  position: { x: number; y: number };
  rotation: number;
}

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const CELL_SIZE = 25;
const INITIAL_SPEED = 800;

const TETROMINOES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 'bg-cyan-500',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'bg-yellow-500',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-purple-500',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: 'bg-green-500',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-red-500',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-blue-500',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-orange-500',
  },
};

const TetrisGame: React.FC<TetrisGameProps> = ({ onQuit }) => {
  const [grid, setGrid] = useState<string[][]>(
    Array(GRID_HEIGHT).fill(Array(GRID_WIDTH).fill(''))
  );
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setHighScore(getHighScore('tetris'));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      updateHighScore('tetris', score);
    }
  }, [score, highScore]);

  const createNewPiece = (): Tetromino => {
    const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    return {
      type: randomType,
      position: { x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 },
      rotation: 0,
    };
  };

  const rotatePiece = (piece: Tetromino): number[][] => {
    const shape = TETROMINOES[piece.type].shape;
    const size = shape.length;
    const rotated = Array(size).fill(0).map(() => Array(size).fill(0));

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        rotated[x][size - 1 - y] = shape[y][x];
      }
    }

    return rotated;
  };

  const getRotatedShape = (piece: Tetromino): number[][] => {
    let shape = TETROMINOES[piece.type].shape;
    
    // Appliquer la rotation autant de fois que nécessaire
    for (let i = 0; i < piece.rotation; i++) {
      const rotated = Array(shape.length).fill(0).map(() => Array(shape.length).fill(0));
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          rotated[x][shape.length - 1 - y] = shape[y][x];
        }
      }
      shape = rotated;
    }

    return shape;
  };

  const isValidMove = (piece: Tetromino, offsetX: number = 0, offsetY: number = 0, newRotation: boolean = false, rotationValue?: number): boolean => {
    const testPiece = {
      ...piece,
      position: {
        x: piece.position.x + offsetX,
        y: piece.position.y + offsetY
      },
      rotation: rotationValue !== undefined ? rotationValue : piece.rotation
    };
    
    const shape = getRotatedShape(testPiece);
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = testPiece.position.x + x;
          const newY = testPiece.position.y + y;

          if (
            newX < 0 ||
            newX >= GRID_WIDTH ||
            newY >= GRID_HEIGHT ||
            (newY >= 0 && grid[newY][newX] !== '')
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const mergePieceToGrid = (piece: Tetromino) => {
    const newGrid = grid.map(row => [...row]);
    const shape = getRotatedShape(piece);
    const color = TETROMINOES[piece.type].color;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const gridY = piece.position.y + y;
          const gridX = piece.position.x + x;
          if (gridY >= 0) {
            newGrid[gridY][gridX] = color;
          }
        }
      }
    }

    return newGrid;
  };

  const clearLines = (newGrid: string[][]) => {
    let linesCleared = 0;
    const updatedGrid = newGrid.filter(row => {
      const isLineFull = row.every(cell => cell !== '');
      if (isLineFull) linesCleared++;
      return !isLineFull;
    });

    while (updatedGrid.length < GRID_HEIGHT) {
      updatedGrid.unshift(Array(GRID_WIDTH).fill(''));
    }

    // Points bonus pour les lignes multiples
    const points = {
      1: 100,  // 1 ligne = 100 points
      2: 300,  // 2 lignes = 300 points
      3: 500,  // 3 lignes = 500 points
      4: 800   // 4 lignes = 800 points (Tetris!)
    };

    if (linesCleared > 0) {
      setScore(prev => prev + (points[linesCleared as keyof typeof points] || linesCleared * 100));
    }

    return updatedGrid;
  };

  const moveDown = () => {
    if (!currentPiece || gameOver || isPaused) return;

    if (isValidMove(currentPiece, 0, 1)) {
      setCurrentPiece({
        ...currentPiece,
        position: {
          ...currentPiece.position,
          y: currentPiece.position.y + 1,
        },
      });
    } else {
      // Points pour avoir placé une pièce
      setScore(prev => prev + 10);
      
      const newGrid = mergePieceToGrid(currentPiece);
      setGrid(clearLines(newGrid));

      const newPiece = createNewPiece();
      if (!isValidMove(newPiece)) {
        setGameOver(true);
      } else {
        setCurrentPiece(newPiece);
      }
    }
  };

  const resetGame = () => {
    setGrid(Array(GRID_HEIGHT).fill(Array(GRID_WIDTH).fill('')));
    setCurrentPiece(createNewPiece());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!currentPiece) {
      setCurrentPiece(createNewPiece());
    }

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

      if (isPaused || gameOver || !currentPiece) return;

      let nextRotation: number;
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          nextRotation = (currentPiece.rotation + 1) % 4;
          if (isValidMove(currentPiece, 0, 0, true, nextRotation)) {
            setCurrentPiece({
              ...currentPiece,
              rotation: nextRotation
            });
          }
          break;
        case 'a':
        case 'arrowleft':
          if (isValidMove(currentPiece, -1, 0)) {
            setCurrentPiece({
              ...currentPiece,
              position: {
                ...currentPiece.position,
                x: currentPiece.position.x - 1,
              },
            });
          }
          break;
        case 's':
        case 'arrowdown':
          moveDown();
          break;
        case 'd':
        case 'arrowright':
          if (isValidMove(currentPiece, 1, 0)) {
            setCurrentPiece({
              ...currentPiece,
              position: {
                ...currentPiece.position,
                x: currentPiece.position.x + 1,
              },
            });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, isPaused, gameOver]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    gameLoopRef.current = setInterval(moveDown, INITIAL_SPEED);
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [currentPiece, gameOver, isPaused]);

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
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
        }}
      >
        {/* Grille de jeu */}
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`absolute ${cell || 'border border-gray-800'}`}
              style={{
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          ))
        )}

        {/* Pièce courante */}
        {currentPiece && getRotatedShape(currentPiece).map((row, y) =>
          row.map((cell, x) => {
            if (cell) {
              const posX = (currentPiece.position.x + x) * CELL_SIZE;
              const posY = (currentPiece.position.y + y) * CELL_SIZE;
              return (
                <div
                  key={`piece-${x}-${y}`}
                  className={`absolute ${TETROMINOES[currentPiece.type].color}`}
                  style={{
                    left: posX,
                    top: posY,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                  }}
                />
              );
            }
            return null;
          })
        )}

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
        Contrôles: WASD/Flèches pour déplacer, W/Haut pour pivoter, Espace pour pause, Q pour quitter, E pour recommencer
      </div>
    </div>
  );
};

export default TetrisGame; 