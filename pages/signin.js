
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { create, storeUser } from '../services/auth.service';
import Layout from "../components/Layout";
import { UserContext } from '../context/UserContext';
import { Form, FormControl, Button, FormLabel, FormGroup } from 'react-bootstrap'
import Notiflix from 'notiflix';
import useWindowDimensions from '../helpers/dimension';
import Link from 'next/link'

export default function Home() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const { height, width } = useWindowDimensions();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Notiflix.Loading.pulse('Loading...');
    try {
      const response = await create(data);
      console.log(response);

      if (response.status === 201) {
        Notiflix.Notify.success("Account Created");
        router.push('/');
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
                        <strong>Username</strong>
                      </label>
                      <input type="text" className="mr-sm-2 custom-field custom" placeholder="E.g John123" {...register('username', {
                        required:
                          true
                      })} />
                    </div>
                    <div className="form-group mb-4">
                      <label className=" mb-2">
                        <strong>First Name</strong>
                      </label>
                      <input type="username" className="mr-sm-2 custom-field custom" placeholder="E.g John123" {...register('firstName', {
                        required:
                          true
                      })} />
                    </div>
                    <div className="form-group mb-4">
                      <label className=" mb-2">
                        <strong>Last Name</strong>
                      </label>
                      <input type="username" className="mr-sm-2 custom-field custom" placeholder="E.g John123" {...register('lastName', {
                        required:
                          true
                      })} />
                    </div>
                    <div className="form-group  mb-4">
                      <label className="mb-2">
                        <strong>Password</strong>
                      </label>
                      <input type="password" autoComplete="off" className="mr-sm-2 custom-field custom" placeholder="Password" {...register('password', {
                        required: true
                      })} />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn-lg btn-block createLogin">

                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <Link href="/"><a className="btn backto"></a></Link>
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
