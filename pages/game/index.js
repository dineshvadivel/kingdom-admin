import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import Layout from "../../components/Layout";
import { getGames } from '../../services/game.service';
import { Form, FormControl, Button, FormLabel, FormGroup } from 'react-bootstrap'
import Notiflix from 'notiflix';

import useWindowDimensions from '../../helpers/dimension';

export default function Game(props) {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    console.log(props)
    setGames([{}, {}, {}])

  }, []);

  const { error, data, isLoading } = getGames();
  if (error) {
    Notiflix.Notify.failure(error);
  }

  const gotoDetailPage = (item) => {
    const path = `/game/${item.gameId}`;
    router.push({
      pathname: path,
    });
  }

  const loadGames = () => {
    if (!isLoading && data && data.response) {
      return data.response.map((item, i) => {
        return (
          <a onClick={(e) => {
            gotoDetailPage(item)
          }}><div className="card blackOp text-white mb-3 ">
              <div className="row ">
                <div className="col">
                  {item.title}
                </div>

                <div className="col">
                  {item.status}
                </div>
              </div>
            </div></a>
        )
      });
    }
  }

  return (
    <div className="App lay" style={{ width: width, height: height }}>
      <div className="container-md  text-white">
        <div className="main">
          <Layout className="">
            <div className="topBar">
              <div className="row ">
                <div className="col"><Link href="/"><a className="btn btn-white btn-sm logbtn"></a></Link></div>
                <div className="col"><img className="mb-4" alt="" width="158" src="/images/logo.png" /></div>
                <div className="col"></div>
              </div>
            </div>

            <Link href="/game/create"><a className="new-game mt-2  mb-3"></a></Link>

            <h3 className="mt-3">Active Game List</h3>
            {loadGames()}
          </Layout>
        </div>

      </div>
    </div>
  )
}
