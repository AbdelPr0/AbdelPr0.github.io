type GameType = 'snake' | 'tetris';

const HIGH_SCORES_KEY = 'gameHighScores';

interface GameScores {
  snake: number;
  tetris: number;
}

export const getHighScore = (game: GameType): number => {
  try {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    if (!scores) return 0;
    
    const parsedScores: GameScores = JSON.parse(scores);
    return parsedScores[game] || 0;
  } catch {
    return 0;
  }
};

export const updateHighScore = (game: GameType, score: number): void => {
  try {
    const currentScores = localStorage.getItem(HIGH_SCORES_KEY);
    const scores: GameScores = currentScores ? JSON.parse(currentScores) : { snake: 0, tetris: 0 };
    
    if (score > scores[game]) {
      scores[game] = score;
      localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    }
  } catch {
    // En cas d'erreur, on ne fait rien
  }
}; 