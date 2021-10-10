
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getFeed, getScoreCard, getLeaderBooard, myTurn, getOpponents } from '../../../services/demo.service';
import Layout from "../../../components/Layout";
import { UserContext } from '../../../context/UserContext';
import Notiflix from 'notiflix';
import useWindowDimensions from '../../../helpers/dimension';

export default function Home() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const { height, width } = useWindowDimensions();
  const { id } = router.query;



  const { error: e, data: d, mutate: fm } = getFeed(id);
  const { error: se, data: sd, mutate: sm } = getScoreCard(id);
  const { error: le, data: ld, mutate: lm } = getLeaderBooard(id);

  const reload = () => {
    fm();
    sm();
    lm();
  }


  const turn = async (data) => {
    const obj = {}
    obj.gameId = id;
    obj.type = data
    Notiflix.Loading.pulse('Loading...');
    try {
      const response = await myTurn(obj);
      if (response.status === 200) {
        reload()
      }
    } catch (e) {
      console.log(e);
      Notiflix.Notify.failure(e.response.data.message);
    } finally {
      Notiflix.Loading.remove();
    }
  };


  const showOpponents = () => {

  }
  const leaderBoard = () => {
    if (ld) {
      return ld.map((item, i) => {
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
  const loadFeed = () => {
    if (d && d) {
      return d.map((item, i) => {
        return (
          <div className="card blackOp text-white mb-3 ">
            <div className="row ">
              <div className="col">
                {item.createdAt}
              </div>

              <div className="col">
                {item.msg}
              </div>
            </div>
          </div>
        )
      });
    }
  }
  return (
    <div className="bg lay" style={{ width: width, height: height }}>
      <div className="container-md wd-450 text-white">
        <main className="">
          <Layout className="">
            <div className="topBar mb-3">
              <div className="row ">
                <div className="col"></div>
                <div className="col"><img className="mb-4" alt="" width="298" src="/images/logo.png" /></div>
                <div className="col"></div>
              </div>
            </div>

            <div className="row  mt-3">
              <div class="col text-center">
                {sd ? `Lumber ${sd.lumber}` : 0}
              </div>
              <div class="col text-center">
                {sd ? `Iron ${sd.iron}` : 0}
              </div>
              <div class="col text-center">
                {sd ? `Wealth ${sd.totalWealth}` : 0}
              </div>
            </div>
            <div className="login-wrap mt-4">
              <div className="row  mt-3">
              </div>
              <div className="row  mt-3">
                <div class=" col text-center">
                  {loadFeed()}
                </div>

              </div>
            </div>
            <div className="row  mt-3">
              <div class="col text-center">
                <a className="btn btn-primary" onClick={(e) => {
                  turn('BUILD_VILLAGE')
                }}>Build Village</a>
              </div>
              <div class="col text-center">
                <a className="btn btn-primary" onClick={(e) => {
                  turn('BUILD_CASTLE')
                }}>Build Castle</a>
              </div>
              <div class="col text-center">
                <a className="btn btn-primary" onClick={(e) => {
                  turn('TRAIN_ARMY')
                }}>Train Army</a>
              </div>
              <div class="col text-center">
                <a className="btn btn-primary" onClick={(e) => {
                  showOpponents()
                }}>Attack</a>
              </div>
            </div>
            <h3 className="mt-3">LeaderBoard</h3>
            {leaderBoard()}
          </Layout>
        </main>

      </div> </div >
  )
}
