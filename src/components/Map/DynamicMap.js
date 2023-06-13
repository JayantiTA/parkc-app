import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { MapContainer, useMap } = ReactLeaflet;

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom, { animate: true });
  return null;
}

function Map({
  children, className, width, height, center, zoom, ...rest
}) {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    }());
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      <ChangeView center={center} zoom={zoom} />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  );
}

export default Map;
