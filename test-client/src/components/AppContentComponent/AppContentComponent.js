import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AppContentComponent.css';

class AppContentComponent extends Component {
  renderNavItems = () => (
    this.props.menuItems.map((item) => (
      <li key={item.name} className="nav-item">
        <Link className="nav-link" to={item.route}>
          <span className="menu-text menu-header">{item.name}</span>
        </Link>
      </li>
    ))
  );

  render() {
    return  (
      <div>
        <div className="leftSideMenu">
        <div className="menu-container">
          <ul className="nav flex-column">
            {this.renderNavItems()}
          </ul>
        </div>
        </div>
        <div className="content">
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppContentComponent;
