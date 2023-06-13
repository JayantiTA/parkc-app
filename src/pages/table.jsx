/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import database from '../../firebase/firebase';
import 'firebase/database';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Home() {
  const [area, setArea] = useState([]);
  const ref = database.ref('area');

  const setRowColor = (park) => {
    if (park.current_slot === 0) {
      return 'table-danger';
    }
    if (park.status === false) {
      return 'table-secondary';
    }
    return 'table-light';
  };

  useEffect(() => {
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      setArea(data);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#f8f2fc', margin: 0 }}>
      <Header />
      <div className="container" style={{ minHeight: '100vh' }}>
        <h3 className="text-center my-4">Search for Parking Area</h3>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="table-responsive table-bordered table-striped" style={{ maxWidth: 800 }}>
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <th scope="col">Name</th>
                    <th scope="col">Current Slot</th>
                    <th scope="col">Max Slot</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {area?.map((park) => (
                    <tr>
                      <td className={setRowColor(park)}>{park.name}</td>
                      <td className={setRowColor(park)}>{park.current_slot}</td>
                      <td className={setRowColor(park)}>{park.max_slot}</td>
                      <td className={setRowColor(park)}>{`${park.status ? 'opened' : 'closed'}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
