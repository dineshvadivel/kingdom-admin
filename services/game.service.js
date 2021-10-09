import helpers from '../helpers/APIHelper';
import useSWR from 'swr'
import axiosInstance from '../helpers/axiosInstance';
import { METHOD_TYPES, PATHS } from '../config/constants';

export function createGame(data) {
    return helpers.callApi(METHOD_TYPES.POST, PATHS.GAME.CREATE, data, {});
}

export function getGames() {
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error } = useSWR(PATHS.GAME.GET_LIST, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error };
}

export function getGameDetail(gameId) {
    const path = PATHS.GAME.GET_GAME_ID.replace('{id}', gameId);
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(path, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error, mutate };
}

export function nextRound(gameId) {
    const path = PATHS.GAME.NEXT_ROUND.replace('{id}', gameId);
    return helpers.callApi(METHOD_TYPES.PATCH, path, {}, {});
}

export function start(gameId) {
    const path = PATHS.GAME.START.replace('{id}', gameId);
    return helpers.callApi(METHOD_TYPES.PATCH, path, {}, {});
}

export function end(gameId) {
    const path = PATHS.GAME.END.replace('{id}', gameId);
    return helpers.callApi(METHOD_TYPES.PATCH, path, {}, {});
}

export function getLeaderBooard(gameId) {
    const path = PATHS.GAME.LEADERBOARD.replace('{id}', gameId);
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(path, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error, mutate };
}

export function getStats(gameId) {
    const path = PATHS.GAME.STATS.replace('{id}', gameId);
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(path, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error , mutate};
}

