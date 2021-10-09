import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import Layout from "../../components/Layout";
import { getGameDetail, getLeaderBooard, nextRound, start, getStats, end } from '../../services/game.service';
import Notiflix from 'notiflix';
import useWindowDimensions from '../../helpers/dimension';
import { SocketContext } from '../../context/socket';


export default function Details(props) {
    const router = useRouter();
    const [completed, setCompleted] = useState(0);
    const { id } = router.query;
    const { height, width } = useWindowDimensions();

    const socket = useContext(SocketContext);

    useEffect(() => {
        console.log(props)

        socket.on('trigger', (text) => {
            if(text.gameId)
            mutate();
            lm();
            sm();
        });


    }, []);


    const { error, data, isLoading, mutate } = getGameDetail(id);
    if (id && error) {
        // Notiflix.Notify.failure(error);
    }
    const { error: er, data: gameInfo, isLoading: isLd, mutate: lm } = getLeaderBooard(id);
    if (id && er) {
        // Notiflix.Notify.failure(error);
    }

    const { error: sErr, data: sInfo, isLoading: sLoad, mutate: sm } = getStats(id);
    if (id && er) {
        // Notiflix.Notify.failure(error);
    }


    const startGame = async () => {
        Notiflix.Loading.pulse('Loading...');
        try {
            const response = await start(id);
            if (response.status === 200) {
                Notiflix.Notify.success("Game Started Successfully");
                mutate()
            }
        } catch (e) {
            console.log(e);
            Notiflix.Notify.failure(e.response.data.message);
        } finally {
            Notiflix.Loading.remove();
        }
    }

    const nxt = async () => {
        Notiflix.Loading.pulse('Loading...');
        try {
            const response = await nextRound(id);
            if (response.status === 200) {
                Notiflix.Notify.success("Next Round Started");
                mutate()
            }
        } catch (e) {
            console.log(e);
            Notiflix.Notify.failure(e.response.data.message);
        } finally {
            Notiflix.Loading.remove();
        }
    }

    const completeGame = async () => {
        Notiflix.Loading.pulse('Loading...');
        try {
            const response = await end(id);
            if (response.status === 200) {
                Notiflix.Notify.success("Game Completed Successfully");
                mutate()
            }
        } catch (e) {
            console.log(e);
            Notiflix.Notify.failure(e.response.data.message);
        } finally {
            Notiflix.Loading.remove();
        }
    }

    

    const leaderBoard = () => {
        if (gameInfo) {
            return gameInfo.map((item, i) => {
                console.log(item);
                return (
                    <div className="card text-white blackOp mb-3 ">
                        <div className="row ">
                            <div className="col">
                                {item.gameName}
                            </div>

                            <div className="col">
                            {item.totalWealth}
                            </div>
                        </div></div>
                )
            });
        } else {
            return (
                <div className="card blackOp mb-3 opacity-25">
                    <div className="row text-white">
                        <div className="col">
                            No details available
                        </div>

                    </div>
                </div>
            )
        }
    }

    return (
        <div className="bg lay" style={{ width: width, height: height }}>
            <div className="container-md wd-450 text-white">
                <div className="main">
                    <Layout className="">
                        <div className="topBar">
                            <div className="row ">
                                <div className="col"><Link href="/game"><a className="btn btn-white btn-sm back"></a></Link></div>
                                <div className="col"><img className="mb-4" alt="" width="158" src="/images/logo.png" /></div>
                                <div className="col">{data && data.currentRound < data.totalRound ? <a className="btn btn-white btn-sm next" onClick={(e) => {
                                    nxt()
                                }}></a> : null}</div>
                            </div>
                        </div>
                        <h3 className="mt-3">Game Detail</h3>
                        {data && data.currentRound <= data.totalRound ? <div className="card blackOp text-white ht-100 mb-3 pt-4 pb-4">
                            <div className="row ">
                                <div className="col">
                                    <div className="row ">
                                        <div className="col-12 blk">Round</div>
                                        <div className="col-12 mt-2">{data.currentRound}/{data.totalRound}</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row ">
                                        <div className="col-12 blk">Players</div>
                                        <div className="col-12 mt-2">{data.participants.length}</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row ">
                                        <div className="col-12  blk txt-sm">Round Completion</div>
                                        {sInfo ? <div className="col-12 mt-2">{sInfo.count}/{data.participants.length}</div> : <div className="col-12 mt-2">0</div>}
                                    </div>
                                </div>
                            </div>
                            {data && data.status === 'CREATED' ?
                                <div className="row mt-1">
                                    <div className="col">
                                        <a className="btn btn-primary stbtn" onClick={(e) => {
                                            startGame()
                                        }}></a>
                                    </div>
                                </div> : null}
                            {data && data.status ==='STARTED' && data.currentRound <= data.totalRound &&  sInfo.count == data.participants.length?
                                <div className="row ">
                                    <div className="col">
                                        <a className="btn btn-primary cmpbtn" onClick={(e) => {
                                            completeGame()
                                        }}></a>
                                    </div>
                                </div> : null}

                        </div> :
                            null}
                        <h3 className="mt-3">LeaderBoard</h3>
                        {leaderBoard()}
                    </Layout>
                </div>

            </div></div>
    )
}
