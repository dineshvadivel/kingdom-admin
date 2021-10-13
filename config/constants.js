import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const env = 'production'
export const BASE_URL = () => {
  if (env === 'development') {
    return 'http://localhost:3050';
  }
  return 'https://api.kingdom.higglerslab.com';
};

export const APP_URL = () => {
  if (env === 'development') {
    return 'http://localhost:3000';
  }
  return 'https://kingdom.higglerslab.com';
};


export const APP_CONFIG = {
  name: 'Kingdom',
};

export const METHOD_TYPES = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const PATHS = {
  AUTH: {
    REGISTER_ADMIN: '/api/v1/users/',
    LOGIN: '/api/v1/users/auth',
    SELF: '/api/v1/users/me',
    GET_BY_ID: '/api/v1/users/{id}',
  },
  GAME: {
    CREATE: '/api/v1/games',
    GET_LIST: '/api/v1/games',
    GET_GAME_ID: '/api/v1/games/{id}',
    START: '/api/v1/games/{id}/start',
    END: '/api/v1/games/{id}/end',
    NEXT_ROUND: '/api/v1/games/{id}/proceed',
    LEADERBOARD: '/api/v1/games/{id}/leaderBoard',
    STATS: '/api/v1/games/{id}/stats',
  },
  DEMO: {
    JOIN: '/api/v1/games/{id}/join',
    MY_TURN: '/api/v1/gameTurn',
    FEED: '/api/v1/games/{id}/feed',
    OPPONENTS: '/api/v1/games/{id}/opponents',
    LEADERBOARD: '/api/v1/games/{id}/leaderBoard',
    MYCARD: '/api/v1/scorecard/{id}',
  },
};

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const SOCKET_URL= "https://api.kingdom.higglerslab.com"
// export const SOCKET_URL= "http://localhost:3050"