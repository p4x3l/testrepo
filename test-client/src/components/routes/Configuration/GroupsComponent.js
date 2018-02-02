import React, { Component } from 'react';

import AppContentComponent from '../../AppContentComponent/AppContentComponent';
import menuItems from './menuItems';

import './GroupsComponent.css';

// Go through actionreducer instead
import { lightGroups } from '../../../mock/LightsData';

class GroupsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
    };
  }

  handleOptionChange = (changeEvent) => {
    let group = this.state.selectedGroup;
    group.schedule = changeEvent.target.value;
    this.setState({
      selectedGroup: group
    });
  };

  renderGroupListItems = () => (
    lightGroups.map((item) => (
      <li key={item.groupId} className="group-list-item pointer pb-3 pt-3 pl-5" onClick={() => this.setState({ selectedGroup: JSON.parse(JSON.stringify(item)) })}>
        <div>{item.groupName}</div>
      </li>
    ))
  );

  renderGroupMembers = () => (
    this.state.selectedGroup.lights.map((member) => (
      <div className="group-member">
        {member.lightName}
      </div> 
    ))
  );

  // Move to own component
  renderGroupView = () => (
    <div className="m-4">
      <div>
        <h2 className="d-inline-block">{this.state.selectedGroup.groupName}</h2>
        <button className="btn btn-primary pull-right" onClick={() => this.setState({ selectedGroup: null })}>Cancel</button>
        <button className="btn btn-secondary pull-right mr-1">Save</button>
      </div>
      <div className="container groups-view">
        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <div>Description</div>
            <textarea className="description-field" value={this.state.selectedGroup.description}></textarea>
            <div>Schedule</div>
            <div className="radio">
              <label>
                <input type="radio" value="christmas" 
                  checked={this.state.selectedGroup.schedule === 'christmas'} 
                  onChange={this.handleOptionChange} />
                Christmas
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="halloween" 
                  checked={this.state.selectedGroup.schedule === 'halloween'} 
                  onChange={this.handleOptionChange} />
                Halloween
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="daylight" 
                  checked={this.state.selectedGroup.schedule === 'daylight'} 
                  onChange={this.handleOptionChange} />
                Daylight Automatic
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12">
            <div>Group Structure</div>
            {this.renderGroupMembers()}
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <AppContentComponent menuItems={menuItems}>
        <div className="container groups-view">
          <div className="row">
            <div className="col-3 p-0">
              <ul className="p-0">
                <li className="group-list-item">
                  <div className="m-3">
                    <input className="filtering-input" placeholder="Filtering" />
                  </div>
                </li>
                {this.renderGroupListItems()}
              </ul>
            </div>
            <div className="col-9">
              {
                this.state.selectedGroup ?
                this.renderGroupView() :
                <span className="m-3">Pick a group in the list</span>
              }
            </div>
          </div>
        </div>
      </AppContentComponent>
    );
  }
};

export default GroupsComponent;
