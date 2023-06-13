/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import database from '../../../firebase/firebase';
import 'firebase/database';

import AdminHeader from '../../components/Header/AdminHeader';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  const [area, setArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState();
  const [showModalForm, setShowModalForm] = useState(false);
  const ref = database.ref('area');

  useEffect(() => {
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setArea(data);
    });
  }, []);

  const handleShowForm = (sArea) => {
    setShowModalForm(true);
    setSelectedArea({ ...sArea, idx: area.indexOf(sArea) } || {});
  };

  const handleCloseForm = () => {
    setShowModalForm(false);
    setSelectedArea({});
  };

  const setRowColor = (park) => {
    if (park.current_slot === 0) {
      return 'table-danger';
    }
    if (park.status === 0) {
      return 'table-secondary';
    }
    return 'table-light';
  };

  const updateArea = () => {
    const tempArea = area;
    tempArea[selectedArea.idx] = { ...selectedArea, status: Number(selectedArea.status) };
    delete tempArea[selectedArea.idx].idx;
    ref.set(tempArea);
  };

  const deleteArea = (park) => {
    ref.set(area.filter((a) => a.name !== park.name));
  };

  return (
    <div style={{ backgroundColor: '#f8f2fc', margin: 0 }}>
      {showModalForm && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={(event) => { event.preventDefault(); updateArea(); handleCloseForm(); }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Area</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseForm} />
                  </div>
                  <div className="modal-body">
                    <div className=" mb-3">
                      <label className="form-label">Name</label>
                      <input disabled type="text" className="form-control" onChange={(event) => setSelectedArea({ ...selectedArea, name: event.target.value })} onChange={(event) => setSelectedArea({ ...selectedArea, name: event.target.value })} value={selectedArea.name} />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">Latitude</label>
                      <input disabled type="number" className="form-control" onChange={(event) => setSelectedArea({ ...selectedArea, latitude: event.target.value })} value={selectedArea.latitude} />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">Longitude</label>
                      <input disabled type="number" className="form-control" onChange={(event) => setSelectedArea({ ...selectedArea, longitude: event.target.value })} value={selectedArea.longitude} />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">Current Slot</label>
                      <input disabled type="number" className="form-control" onChange={(event) => setSelectedArea({ ...selectedArea, current_slot: event.target.value })} value={selectedArea.current_slot} />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">Max Slot</label>
                      <input disabled type="number" className="form-control" onChange={(event) => setSelectedArea({ ...selectedArea, max_slot: event.target.value })} value={selectedArea.max_slot} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select" onChange={(event) => setSelectedArea({ ...selectedArea, status: event.target.value })} value={selectedArea.status}>
                        <option value={1}>opened</option>
                        <option value={0}>closed</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseForm}>Close</button>
                    <button className="btn btn-primary" type="submit">Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <AdminHeader />
      <div className="container" style={{ minHeight: '100vh' }}>
        <h3 className="text-center my-4">Parking Area Table</h3>
        <div className="row justify-content-center">
          <div className="col-10">
            <div
              className="table-responsive table-bordered table-striped"
            >
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <th scope="col">Name</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Current Slot</th>
                    <th scope="col">Max Slot</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {area?.map((park) => (
                    <tr>
                      <td className={setRowColor(park)}>{park.name}</td>
                      <td className={setRowColor(park)}>{park.latitude}</td>
                      <td className={setRowColor(park)}>{park.longitude}</td>
                      <td className={setRowColor(park)}>{park.current_slot}</td>
                      <td className={setRowColor(park)}>{park.max_slot}</td>
                      <td className={setRowColor(park)}>
                        {`${park.status ? 'opened' : 'closed'}`}
                      </td>
                      <td
                        className={`${setRowColor(
                          park,
                        )} d-flex justify-content-center`}
                      >
                        <button
                          type="button"
                          className="btn btn-warning mx-2"
                          data-bs-toggle="modal"
                          onClick={() => handleShowForm(park)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          data-bs-toggle="modal"
                          onClick={() => deleteArea(park)}
                        >
                          Delete
                        </button>
                      </td>
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
