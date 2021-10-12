import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import Layout from "../../components/Layout";
import { getGameDetail, getLeaderBooard, nextRound, start, getStats, end } from '../../services/game.service';
import Notiflix from 'notiflix';
import useWindowDimensions from '../../helpers/dimension';
import { SocketContext } from '../../context/socket';
import Timer from '../../components/Timer'

export default function Details(props) {
    const router = useRouter();
    const [timeUp, setTimesUp] = useState(false);
    const [ts, setTs] = useState(0);
    const { id } = router.query;
    const { height, width } = useWindowDimensions();

    const socket = useContext(SocketContext);


    const { error: error, data: data, isLoading, mutate: mutate } = getGameDetail(id);
    const { error: er, data: gameInfo, isLoading: isLd, mutate: lm } = getLeaderBooard(id);
    const { error: sErr, data: sInfo, isLoading: sLoad, mutate: sm } = getStats(id);


    useEffect(() => {
        console.log(props)
        socket.on('trigger', (text) => {
            if (text.gameId)
                mutate();
            lm();
            sm();
        });
        if (data) {
            setTs(data.endOfNextRound);
        }
    }, [data]);



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
                setTs(response.ts)
                setTimesUp(false)
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
        }
    }

    const endOfTurn = (state) => {
        setTimesUp(true)
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
        <div className="App lay" style={{ width: width, height: height }}>
            <div className="Background">
                <div className="container-md  text-white" style={{ padding: 0 }}>
                    <Layout className="">
                        <div className="topBar">
                            <div className="row ">
                                <div className="col"><Link href="/game"><a className="btn back"></a></Link></div>
                                <div className="col"><img className="mb-4" alt="" width="158" src="/images/logo.png" /></div>
                                <div className="col"></div>
                            </div>
                        </div>

                        <h3 className="mt-3">Game Detail</h3>
                        <div className="card blackOp text-white ht-100  mb-3 pt-4 pb-4" style={{ padding: '10px', height: "auto" }}>
                            <div className="col"> <span>Game Url</span><br />
                                <a href={`https://kingdom-99f01.web.app/${id}`} target="_blank" className="text-sm link">{`https://kingdom-99f01.web.app/${id}`}</a>
                            </div>
                        </div>

                        {data && data.currentRound <= data.totalRound ?
                            <div className="card blackOp text-white mb-3 pt-4 pb-4" style={{ height: "auto" }}>
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
                                {ts && !timeUp ?
                                    <div className="row mt-4">
                                        <div className="col">
                                            <h4>Next Round in </h4>
                                            <div class="woodbtn pt-4"><Timer
                                                endOfRound={ts}
                                                callBack={endOfTurn}
                                            /></div>
                                        </div>
                                    </div> : <div className="row mt-4">
                                        <div className="col">
                                            {data && data.status === 'STARTED' && data.currentRound < data.totalRound ? <a className="btn  next_round" onClick={(e) => {
                                                nxt()
                                            }}></a> : null}
                                        </div>
                                    </div>}
                                {data && data.status === 'STARTED' && data.currentRound == data.totalRound && sInfo && sInfo.count == data.participants.length ?
                                    <div className="row mt-4">
                                        <div className="col">
                                            <a className="btn btn-primary cmpbtn" onClick={(e) => {
                                                completeGame()
                                            }}></a>
                                        </div>
                                    </div> : null}

                            </div> :
                            null}
                        <div className="row mt-4">
                            <div className="col"> <h3 className="mt-3">LeaderBoard</h3>
                                {leaderBoard()}
                            </div>  </div>
                    </Layout>
                </div>

            </div></div>
    )
}
