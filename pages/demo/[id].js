
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { login, storeUser } from '../../services/auth.service';
import { joinGame } from '../../services/demo.service';
import Layout from "../../components/Layout";
import { UserContext } from '../../context/UserContext';
import Notiflix from 'notiflix';
import useWindowDimensions from '../../helpers/dimension';

export default function Home() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const { height, width } = useWindowDimensions();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    Notiflix.Loading.pulse('Loading...');
    try {
      const response = await joinGame(id, data);

      if (response.status === 200) {
        storeUser(response.data);
        setUser(response.data);
        router.push(`/demo/play/${id}`);
      }
    } catch (e) {
      console.log(e);
      Notiflix.Notify.failure(e.response.data.message);
    } finally {
      Notiflix.Loading.remove();
    }
  };
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

            <div className="login-wrap mt-4">

              <div className="row  mt-3">
                <div class="col-12 text-center">
                  <h1 className="h3 mb-3 font-weight-normal ">Please sign in</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-4">
                      <label className=" mb-2">
                        <strong>GameName</strong>
                      </label>
                      <input type="text" className="form-control mr-sm-2 custom-field custom" placeholder="India" {...register('gameName', {
                        required:
                          true
                      })} />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn-lg btn-block custom-btn">

                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </Layout>
        </main>

      </div> </div>
  )
}
