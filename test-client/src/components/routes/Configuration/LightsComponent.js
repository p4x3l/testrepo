import React, { Component } from 'react';

import AppContentComponent from '../../AppContentComponent/AppContentComponent';
import menuItems from './menuItems';

import './LightsComponent.css';

// Go through actionreducer instead
import { lights } from '../../../mock/LightsData';

class LightsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightToView: null,
      selectedLights: []
    };
  }

  isSelected = (id) => {
    return this.state.selectedLights.findIndex((itemId) => itemId === id) !== -1;
  }

  toggleSelected = (id) => {
    let selected = this.state.selectedLights;
    if (this.isSelected(id)) {
      const index = selected.findIndex((itemId) => itemId === id);
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.setState({ selectedLights: selected });
  }

  renderLightsListItems = () => (
    lights.map((item) => (
      <li key={item.lightId} className="light-list-item pointer pb-3 pt-3 pl-5" onClick={() => this.setState({ lightToView: JSON.parse(JSON.stringify(item)) })}>
        <div className="d-inline-block">{item.lightName}</div>
        <div className="pull-right mr-3" onClick={() => this.toggleSelected(item.lightId)}><i className={`fa ${this.isSelected(item.lightId) ? 'fa-circle' : 'fa-circle-o'} fa-lg selector-indicator`} /></div>
      </li>
    ))
  );

    // Move to own component
    renderLightView = () => (
      <div className="m-4">
        <div>
          <h2 className="d-inline-block">{this.state.lightToView.lightName}</h2>
          <button className="btn btn-primary pull-right" onClick={() => this.setState({ lightToView: null })}>Cancel</button>
          <button className="btn btn-secondary pull-right mr-1">Save</button>
        </div>
        <div className="container lights-view">
          placeholder text
        </div>
      </div>
    );

  render() {
    return (
      <AppContentComponent menuItems={menuItems}>
        <div className="container lights-view">
          <div className="row">
            <div className="col-3 p-0">
              <ul className="p-0">
                <li className="light-list-item">
                  <div className="m-3">
                    <input className="filtering-input" placeholder="Filtering" />
                  </div>
                </li>
                {this.renderLightsListItems()}
              </ul>
              <div className="m-3">
                <button className="btn btn-secondary mr-3" onClick={() => this.setState({ selectedLights: [] })}>Deselect</button>
                <button className="btn btn-primary pull-right" onClick={() => console.log('Creating group...')}>Create Group</button>
              </div>
            </div>
            <div className="col-9">
              {
                this.state.lightToView ?
                this.renderLightView() :
                <span className="m-3">Pick a group in the list</span>
              }
            </div>
          </div>
        </div>
      </AppContentComponent>
    );
  }
}

export default LightsComponent;
