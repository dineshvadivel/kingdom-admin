import helpers from '../helpers/APIHelper';
import useSWR from 'swr'
import axiosInstance from '../helpers/axiosInstance';
import { METHOD_TYPES, PATHS } from '../config/constants';

export function joinGame(gameId, data) {
    const path = PATHS.DEMO.JOIN.replace('{id}', gameId);
    return helpers.callApi(METHOD_TYPES.PATCH, path, data, {});
}

export function myTurn(data) {
    return helpers.callApi(METHOD_TYPES.POST, PATHS.DEMO.MY_TURN, data, {});
}

export function getFeed(gameId) {
    const path = PATHS.DEMO.FEED.replace('{id}', gameId);
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(path, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error, mutate };
}

export function getOpponents(gameId) {
    const path = PATHS.DEMO.OPPONENTS.replace('{id}', gameId);
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(path, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error, mutate };
}


export function getLeaderBooard(gameId) {
    const path = PATHS.DEMO.LEADERBOARD.replace('{id}', gameId);
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(path, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error, mutate };
}

export function getScoreCard(gameId) {
    console.log(gameId)
    const path = PATHS.DEMO.MYCARD.replace('{id}', gameId);
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(path, fetcher, {
        revalidateOnFocus: false,
    });
    return { data, isLoading: !data && !error, error , mutate};
}
