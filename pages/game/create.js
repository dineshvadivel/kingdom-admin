import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import { useForm } from 'react-hook-form';
import Layout from "../../components/Layout";
import { createGame } from '../../services/game.service';
import Notiflix from 'notiflix';
import useWindowDimensions from '../../helpers/dimension';

export default function Create(props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    console.log(props)
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    data.gameMode = "INDIVIDUAL"
    Notiflix.Loading.pulse('Loading...');
    try {
      const response = await createGame(data);
      console.log(response);
      if (response.status === 201) {
        router.push('/game');
      }
    } catch (e) {
      console.log(e);
      Notiflix.Notify.failure(e.response.data.message);
    } finally {
      Notiflix.Loading.remove();
    }
  };



  return (
    <div className="App lay" style={{ width: width, height: height }}>
      <div className="Background">
        <div className="container-md text-white">
          <Layout className="">
            <div className="topBar">
              <div className="row ">
                <div className="col"><Link href="/game"><a className="btn btn-white btn-sm back"></a></Link></div>
                <div className="col"><img className="mb-4" alt="" width="158" src="/images/logo.png" /></div>
                <div className="col"></div>
              </div>
            </div>
            <h3 className="mt-3">Start a new game</h3>
            <div className="login-wrap">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                  <label className=" mb-2">
                    <strong>Game Name</strong>
                  </label>
                  <input type="text" className=" mr-sm-2 custom-field custom" placeholder="Game Name" {...register('title', {
                    required:
                      true
                  })} />
                </div>
                <div className="form-group mb-4">
                  <label className=" mb-2">
                    <strong>Total Rounds</strong>
                  </label>
                  <input type="number" min="0" placeholder="No of Rounds" className="mr-sm-2 custom-field custom" {...register('totalRound', {
                    required:
                      true
                  })} />
                </div>
                {/* <div className="form-group mb-4">
                  <label className=" mb-2">
                    <strong>Game Mode</strong>
                  </label>
                  <select className=" mr-sm-2 custom-field custom" aria-label="Default select example" {...register('mode', {
                    required:
                      true
                  })}>
                    <option selected>Select Mode</option>
                    <option value="1">Individual</option>
                    <option value="2">Team</option>
                  </select>
                </div> */}
                <div className="text-center">
                  <button type="submit" className="btn-lg btn-block create-game mt-3 mb-3">

                  </button>
                </div>

              </form>
            </div>
          </Layout>
        </div>

      </div></div>
  )
}
