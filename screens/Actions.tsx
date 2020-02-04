export const setHighScore = (key: number) => (
    {
      type: 'SET_HIGHSCORE',
      payload: key
    }
);

export const setLives = (key: number) => (
  {
    type: 'SET_LIVES',
    payload: key
  }
);