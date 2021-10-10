import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


import Layout from "../../components/Layout";
import { Form, FormControl, Button, FormLabel, FormGroup } from 'react-bootstrap'

import useWindowDimensions from '../../helpers/dimension';
export default function Share(props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    console.log(props)
    setGames([{}, {}, {}])
  }, []);

  const loadGames = () => {
    return games.map((item, i) => {
      console.log(item);
      return (
        <div className="card mb-3 ">
          <div className="row ">
            <div className="col">
              Game Name
            </div>

            <div className="col">
              Active
            </div>
          </div></div>
      )
    });
  }

  return (
    <div className="bg lay" style={{ width: width, height: height }}>
    <div className="container-md wd-450 text-white">
      <div className="main">
        <Layout className="">
          <div className="topBar"><img className="mb-4" alt="" width="158" src="/images/logo.png" /></div>
          <h3 className="mt-3">Share it with your friends</h3>
          <div className="card ht-150 mb-3 pt-4 pb-4">
            <div className="row ">
              <div className="col-12">
                Game Link
              </div>

              <div className="col-12 mt-3">
                <a href="https://kingdom.higglerslab.com?gameId=845679">https://kingdom.higglerslab.com?gameId=845679</a>
              </div>
            </div>
          </div>
        </Layout>
      </div>

    </div>
    </div>
  )
}
