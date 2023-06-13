/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const login = (event) => {
    event.preventDefault();
    router.push('/admin/table');
  };

  return (
    <div className="align-center" style={{ backgroundColor: '#f8f2fc', margin: 0, minHeight: '100vh' }}>
      <div className="row">
        <div className="col-3">
          &nbsp;
        </div>
        <div className="col-6 d-flex align-items-center vh-100">
          <div
            className="container rounded-5 py-4 px-5"
            style={{ backgroundColor: '#7e38b7', color: '#E0E1ED', minHeight: 400 }}
          >
            <h1 className="my-4">Admin Login</h1>
            <form onSubmit={login}>
              <div className="my-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="my-4">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="d-flex flex-row-reverse mx-3  ">
                <button type="submit" className="btn btn-dark btn-lg mt-3 float-right" style={{ backgroundColor: '#32005c' }}>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-3">
          &nbsp;
        </div>
      </div>
    </div>
  );
}
