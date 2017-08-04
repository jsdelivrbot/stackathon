import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><Link to='/home'>Splitter</Link></li>
          	<li><Link to='/submit-receipt'>New</Link></li>
          </ul>
        </div>
    </nav>
  );
}

export default Navbar;
