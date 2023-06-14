/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import database from '../../firebase/firebase';
import 'firebase/database';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Section from '../components/Section';
import Container from '../components/Container';
import Map from '../components/Map';

import styles from '../styles/Home.module.scss';

export default function Home() {
  const [area, setArea] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState([-7.284691674524294, 112.793789836901]);
  const [selectedArea, setSelectedArea] = useState();
  const ref = database.ref('area');
  useEffect(() => {
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      setArea(data);
      if (!selectedArea) {
        data.forEach((park) => {
          if (park?.name) {
            setSelectedArea(park?.name);
            setDefaultCenter([park?.latitude, park?.longitude]);
            return true;
          }
        });
      } else {
        setSelectedArea(selectedArea);
      }
    });
  }, [selectedArea]);

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
      * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function getRecArea({ name }) {
    let recommendedArea = name;
    let dist = 0;
    let lat = 0;
    let lon = 0;
    const availableArea = [];
    area.forEach((park) => {
      if (park.current_slot < park.max_slot && park.status) {
        availableArea.push(park);
      }
      if (park.name === name) {
        lat = park.latitude;
        lon = park.longitude;
      }
    });
    availableArea.forEach((park) => {
      const nD = getDistanceFromLatLonInKm(park?.latitude, park?.longitude, lat, lon);
      if (dist === 0) {
        dist = nD;
        recommendedArea = park;
      }
      if (dist > nD) {
        dist = nD;
        recommendedArea = park;
      }
    });
    return recommendedArea.name;
  }

  const handleSelectedArea = (event) => {
    event.preventDefault();
    const eventSelectedArea = area.find((park) => park?.name === event.target.value);
    setSelectedArea(event.target.value);
    setDefaultCenter([eventSelectedArea.latitude, eventSelectedArea.longitude]);
  };

  return (
    <div style={{ backgroundColor: '#f8f2fc', margin: 0 }}>
      <Header />
      <Section>
        <Container>
          <h3 className="text-center">Search for Parking Area</h3>
          <div className="row">
            <div className="col-md-3">&nbsp;</div>
            <div className="col-md-6">
              <select name="select_box" className="form-select my-3" id="select_box" value={selectedArea} onChange={handleSelectedArea}>
                {
                  area.map((park) => (
                    <option value={park.name}>{park.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-md-3">&nbsp;</div>
          </div>
          <Map
            className={styles.homeMap}
            width="800"
            height="400"
            center={defaultCenter}
            zoom={20}
          >
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {area.map((park) => (
                  <Marker position={[park.latitude, park.longitude]}>
                    <Popup>
                      {park.name}
                      <br />
                      Slot:
                      {' '}
                      {park.current_slot}
                      <br />
                      Status:
                      {park.status ? park.current_slot === park.max_slot ? 'penuh' : 'kosong' : 'tutup'}
                      <br />
                      Recommended Area:
                      {' '}
                      {((park.current_slot === park.max_slot) || (!park.status)) ? getRecArea({
                        name: park.name,
                      }) : 'parkir disini aja'}
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </Map>
        </Container>
      </Section>
      <Footer />
    </div>
  );
}
