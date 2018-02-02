import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  PropTypes as MapPropTypes,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import AppContentComponent from '../../AppContentComponent/AppContentComponent';
import './MapComponent.css';
import menuItems from './menuItems';

const MyPopupMarker = ({ children, position }) => (
  <Marker position={position}>
    <Popup>
      <span>{children}</span>
    </Popup>
  </Marker>
);

MyPopupMarker.propTypes = {
  children: MapPropTypes.children.isRequired,
  position: MapPropTypes.latlng.isRequired,
};

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ));
  return <div style={{ display: 'none' }}>{items}</div>;
};

MyMarkersList.propTypes = {
  markers: PropTypes.array.isRequired,
};

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 59.337245,
      lng: 18.050195,
      zoom: 10,
    };
  }

  render() {
    const center = [this.state.lat, this.state.lng];

    const markers = [
      { key: 'marker1', position: [59.337245, 18.050195], children: 'My first popup' },
      { key: 'marker2', position: [59.343170, 18.060986], children: 'My second popup' },
      { key: 'marker3', position: [59.332111, 18.079365], children: 'My third popup' },
      { key: 'marker4', position: [59.324680, 18.121460], children: 'My forth popup' },
      { key: 'marker5', position: [59.271810, 18.094484], children: 'My fifth popup' },
    ];

    return (
      <AppContentComponent menuItems={menuItems}>
        <div>
          Information/Map Route
        </div>
        <div>
          <Map center={center} zoom={this.state.zoom}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyMarkersList markers={markers} />
          </Map>
        </div>
        <div className="mt-3">
          <Map className="markercluster-map" center={[59.337245, 18.050195]} zoom={10} maxZoom={18}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup markers={markers} />
          </Map>
        </div>
      </AppContentComponent>
    );
  }
}

export default MapComponent;
